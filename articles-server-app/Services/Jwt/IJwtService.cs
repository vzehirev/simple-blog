using System.Threading.Tasks;

namespace articles_server_app.Jwt.Services
{
    public interface IJwtService
    {
        string GenerateNewJwtAccessToken(string userId);

        Task<string> GenerateNewRefreshTokenAsync(string jwtAccessToken);

        Task<string> RefreshJwtAccessTokenAsync(string oldJwtAccessToken, string refreshToken, string userId);
    }
}
