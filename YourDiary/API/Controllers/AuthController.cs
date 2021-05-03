using System;
using Microsoft.AspNetCore.Mvc;
using YourDiary.API.Services.AuthService;
using YourDiary.API.ViewModels.Auth;
using YourDiary.Data.Interfaces;
using YourDiary.Model;

namespace YourDiary.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IAuthService authService;
        IUserRepository userRepository;
        public AuthController(IAuthService authService, IUserRepository userRepository)
        {
            this.authService = authService;
            this.userRepository = userRepository;
        }

        [HttpPost("login")]
        public ActionResult<AuthData> Post([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var user = userRepository.GetSingle(u => u.Username == model.Username);

            if (user == null)
            {
                return BadRequest(new { email = "No user with this email" });
            }

            var passwordValid = authService.VerifyPassword(model.Password, user.Password);
            if (!passwordValid) {
                return BadRequest(new { password = "Invalid password" });
            }

            return authService.GetAuthData(user);
        }

        [HttpPost("register")]
        public ActionResult<AuthData> Post([FromBody]RegisterViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var emailUniq = userRepository.IsEmailUniq(model.Email);
            if (!emailUniq) return BadRequest(new { email = "User with this email already exists" });
            var usernameUniq = userRepository.IsUsernameUniq(model.Username);
            if (!usernameUniq) return BadRequest(new { username = "User with this username already exists" });

            var id = Guid.NewGuid().ToString();
            var user = new User
            {
                Id = id,
                Username = model.Username,
                Email = model.Email,
                Password = authService.HashPassword(model.Password)
            };
            userRepository.Add(user);
            userRepository.Commit();

            return authService.GetAuthData(user);
        }
    }
}