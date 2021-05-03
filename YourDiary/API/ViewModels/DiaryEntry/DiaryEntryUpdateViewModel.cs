using System.Collections.Generic;

namespace YourDiary.API.ViewModels.DiaryEntry
{
    public class DiaryEntryUpdateViewModel
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public List<string> Tags { get; set; }
    }
}