using YourDiary.API.ViewModels.Auth;

namespace YourDiary.API.Services.AuthService
{
    public interface IAuthService
    {
        string HashPassword(string password);
        bool VerifyPassword(string actualPassword, string hashedPassword);
        AuthData GetAuthData(string id);
    }
}