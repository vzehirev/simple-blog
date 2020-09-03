using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using articles_server_app.Data.Models;
using articles_server_app.Jwt.Services;
using articles_server_app.Users.DtoModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace articles_server_app.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IJwtService jwtService;

        public AuthController(UserManager<ApplicationUser> userManager, IJwtService jwtService)
        {
            this.userManager = userManager;
            this.jwtService = jwtService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                return StatusCode(StatusCodes.Status406NotAcceptable,
                    new { Message = "Password and confirm password don't match!" });
            }

            var userExists = await userManager.FindByNameAsync(model.Email);
            if (userExists != null)
            {
                return StatusCode(StatusCodes.Status409Conflict,
                    new { Message = "User already exists!" });
            }

            var user = new ApplicationUser()
            {
                Email = model.Email,
                UserName = model.Email,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    new { Message = "User creation failed!" });
            }

            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto model)
        {
            var user = await userManager.FindByNameAsync(model.Email);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var jwtAccessToken = this.jwtService.GenerateNewJwtAccessToken(user.Id);
                var refreshToken = await this.jwtService.GenerateNewRefreshTokenAsync(jwtAccessToken);

                return Ok(new { Token = jwtAccessToken, RefreshToken = refreshToken });
            }

            return Unauthorized();
        }

        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> RefreshJwtAccessToken()
        {
            string oldJwtAccessTokenString = null;

            if (this.HttpContext.Request.Headers.TryGetValue("Authorization", out var oldJwtAccessToken))
            {
                oldJwtAccessTokenString = oldJwtAccessToken.ToString().Replace("Bearer ", "");
            }

            string refreshTokenString = null;

            if (this.HttpContext.Request.Headers.TryGetValue("Refresh", out var refreshToken))
            {
                refreshTokenString = refreshToken.ToString();
            }

            var userId = new JwtSecurityToken(oldJwtAccessTokenString).Claims
                .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;

            if (oldJwtAccessTokenString == null || refreshTokenString == null || userId == null)
            {
                return Unauthorized();
            }

            var newJwtAccessToken = await this.jwtService
                .RefreshJwtAccessTokenAsync(oldJwtAccessTokenString, refreshTokenString, userId.ToString());

            if (newJwtAccessToken == null)
            {
                return Unauthorized();
            }

            var newRefreshToken = await this.jwtService.GenerateNewRefreshTokenAsync(newJwtAccessToken);

            return Ok(new { Token = newJwtAccessToken, RefreshToken = newRefreshToken });
        }
    }
}
