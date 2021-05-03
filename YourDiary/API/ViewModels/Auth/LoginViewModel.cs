using System.ComponentModel.DataAnnotations;

namespace YourDiary.API.ViewModels.Auth
{
    public class LoginViewModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}