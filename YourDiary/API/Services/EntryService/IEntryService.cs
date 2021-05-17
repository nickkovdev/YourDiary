using YourDiary.API.ViewModels.Auth;
using YourDiary.Model;

namespace YourDiary.API.Services.AuthService
{
    public interface IEntryService
    {
        public string SubstringHtml(string stringValue, int length);
    }
}