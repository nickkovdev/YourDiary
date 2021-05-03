namespace YourDiary.API.ViewModels.Auth
{
    public class AuthData
    {
        public string Token { get; set; }
        public long TokenExpirationTime { get; set; }
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}