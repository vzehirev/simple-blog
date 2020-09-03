namespace articles_server_app.Users.DtoModels
{
    public class LoginSuccessTokensDto
    {
        public string JwtAccessToken { get; set; }

        public string RefreshToken { get; set; }
    }
}
