using System.ComponentModel.DataAnnotations;

namespace articles_server_app.Users.DtoModels
{
    public class RegisterUserDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
    }
}
