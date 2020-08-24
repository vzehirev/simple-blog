using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace articles_server_app.Data.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }

        public string Token { get; set; }

        public string JwtAccessToken { get; set; }

        public DateTime ExpiresAt { get; set; }
    }
}
