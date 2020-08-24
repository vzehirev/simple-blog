using System.Threading.Tasks;

namespace articles_server_app.Services
{
    public interface IJwtService
    {
        string GenerateNewJwtAccessToken();

        Task<string> GenerateNewRefreshTokenAsync(string jwtAccessToken);

        Task<string> RefreshJwtAccessTokenAsync(string oldJwtAccessToken, string refreshToken);
    }
}
