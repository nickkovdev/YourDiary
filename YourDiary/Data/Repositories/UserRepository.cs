using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YourDiary.Data.Interfaces;
using YourDiary.Model;

namespace YourDiary.Data.Repositories
{
    public class UserRepository : EntityBaseRepository<User>, IUserRepository {
        public UserRepository (DiaryContext context) : base (context) {}

        public bool IsEmailUniq(string email)
        {
            var user = this.GetSingle(u => u.Email == email);
            return user == null;
        }

        public bool IsUsernameUniq(string username)
        {
            var user = this.GetSingle(u => u.Username == username);
            return user == null;
        }
    }
}
