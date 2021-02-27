namespace YourDiary.Data
{
    public interface IUserRepository
    {
        bool IsUsernameUniq(string username);
        bool IsEmailUniq(string email);
    }
}