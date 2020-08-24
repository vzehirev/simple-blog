using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace articles_server_app.DtoModels
{
    public class LoginSuccessTokensDto
    {
        public string JwtAccessToken { get; set; }

        public string RefreshToken { get; set; }
    }
}
