using YourDiary.Data.Interfaces;
using YourDiary.Model;

namespace YourDiary.Data.Repositories
{
    public class DiaryEntryRepository : EntityBaseRepository<DiaryEntry>, IDiaryEntryRepository
    {
        public DiaryEntryRepository(DiaryContext context) : base (context) {}

        public bool IsOwner(string storyId, string userId)
        {
            var story = GetSingle(s => s.Id == storyId);
            return story.OwnerId == userId;
        }
    }
}