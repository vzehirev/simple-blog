using System;
using System.Threading.Tasks;
using articles_server_app.Data.Models;
using articles_server_app.DtoModels;
using articles_server_app.Services;
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

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                UserName = model.Email,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    new { Message = "User creation failed! Please check user details and try again." });
            }

            return Ok(new{ success = true });
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto model)
        {
            var user = await userManager.FindByNameAsync(model.Email);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var jwtAccessToken = this.jwtService.GenerateNewJwtAccessToken();
                var refreshToken = await this.jwtService.GenerateNewRefreshTokenAsync(jwtAccessToken);

                SetTokensHeaderAndCookie(refreshToken);

                return Ok(new { Token = jwtAccessToken });
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

            this.HttpContext.Request.Cookies.TryGetValue("RefreshToken", out var refreshToken);

            var newJwtAccessToken = await this.jwtService.RefreshJwtAccessTokenAsync(oldJwtAccessTokenString, refreshToken);

            if (newJwtAccessToken == null)
            {
                return Unauthorized();
            }

            var newRefreshToken = await this.jwtService.GenerateNewRefreshTokenAsync(newJwtAccessToken);

            SetTokensHeaderAndCookie(newRefreshToken);

            return Ok(new { Token = newJwtAccessToken });
        }

        private void SetTokensHeaderAndCookie(string refreshToken)
        {
            var refreshTokenCookieOptions = new CookieOptions
            {
                MaxAge = TimeSpan.FromDays(90),
                HttpOnly = true,
                IsEssential = true,
                SameSite = SameSiteMode.Strict,
                Secure = true,
                Path = "/auth/refresh"
            };

            this.Response.Cookies.Append("RefreshToken", refreshToken, refreshTokenCookieOptions);
        }
    }
}
