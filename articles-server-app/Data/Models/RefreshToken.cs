using System;
using System.ComponentModel.DataAnnotations;

namespace articles_server_app.Data.Models
{
    public class RefreshToken
    {
        [Required, Key]
        public int Id { get; set; }

        [Required]
        public string Token { get; set; }

        [Required]
        public string JwtAccessToken { get; set; }

        [Required]
        public DateTime ExpiresAt { get; set; }
    }
}
