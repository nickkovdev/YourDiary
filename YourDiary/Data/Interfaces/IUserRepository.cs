using YourDiary.Model;

namespace YourDiary.Data.Interfaces
{
    public interface IUserRepository : IEntityBaseRepository<User>
    {
        bool IsUsernameUniq(string username);
        bool IsEmailUniq(string email);
    }
}