﻿using System.Collections.Generic;

namespace YourDiary.Model
{
    public class DiaryEntry : IEntityBase
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public List<string> Tags { get; set; } = new List<string>();
        public long CreationTime { get; set; }
        public long LastEditTime { get; set; }
        public long PublishTime { get; set; }
        public bool Draft { get; set; }

        public User Owner { get; set; }
        public string OwnerId { get; set; }
    }
}