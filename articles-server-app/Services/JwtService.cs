using articles_server_app.Data;
using articles_server_app.Data.Models;
using articles_server_app.DtoModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace articles_server_app.Services
{
    class JwtService : IJwtService
    {
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext dbContext;

        public JwtService(IConfiguration configuration, ApplicationDbContext dbContext)
        {
            this.configuration = configuration;
            this.dbContext = dbContext;
        }

        public string GenerateNewJwtAccessToken()
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: this.configuration["JWT:ValidIssuer"],
                audience: this.configuration["JWT:ValidAudience"],
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string> GenerateNewRefreshTokenAsync(string jwtAccessToken)
        {
            var refreshToken = new RefreshToken
            {
                Token = Guid.NewGuid().ToString(),
                ExpiresAt = DateTime.UtcNow.AddDays(90),
                JwtAccessToken = jwtAccessToken
            };

            this.dbContext.RefreshTokens.Add(refreshToken);
            await this.dbContext.SaveChangesAsync();

            return refreshToken.Token;
        }

        public async Task<string> RefreshJwtAccessTokenAsync(string oldJwtAccessToken, string refreshToken)
        {
            var refreshTokenModel = await this.dbContext.RefreshTokens.SingleOrDefaultAsync(x => x.Token == refreshToken);

            if (refreshTokenModel == null)
            {
                return null;

            }
            else if (refreshTokenModel.JwtAccessToken != oldJwtAccessToken || refreshTokenModel.ExpiresAt < DateTime.UtcNow)
            {
                refreshTokenModel.ExpiresAt = DateTime.UtcNow;
                dbContext.RefreshTokens.Update(refreshTokenModel);
                await dbContext.SaveChangesAsync();

                return null;
            }

            return this.GenerateNewJwtAccessToken();
        }
    }
}
