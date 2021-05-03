using YourDiary.Model;

namespace YourDiary.Data.Interfaces
{
    public interface IDiaryEntryRepository: IEntityBaseRepository<DiaryEntry>
    {
        bool IsOwner(string storyId, string userId);
    }
}