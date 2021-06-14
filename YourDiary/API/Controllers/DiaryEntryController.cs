using System;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YourDiary.API.Services.AuthService;
using YourDiary.API.ViewModels.DiaryEntry;
using YourDiary.Data.Interfaces;
using YourDiary.Model;

namespace YourDiary.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DiaryEntryController : ControllerBase
    {
        IDiaryEntryRepository _diaryEntryRepository;
        IMapper _mapper;
        IEntryService _entryService;

        public DiaryEntryController(IDiaryEntryRepository diaryEntryRepository, IMapper mapper, IEntryService entryService)
        {
            _diaryEntryRepository = diaryEntryRepository;
            _mapper = mapper;
            _entryService = entryService;
        }
        
        [HttpGet("{id}")]
        public ActionResult<DiaryEntryDetailsViewModel> GetStoryDetail(string id)
        {
            var story = _diaryEntryRepository.GetSingle(s => s.Id == id, s => s.Owner);
            return _mapper.Map<DiaryEntryDetailsViewModel>(story);
        }

        [HttpPost("{id}/draft")]
        public ActionResult<DiaryEntryCreateViewModel> Post([FromBody]DiaryEntryUpdateViewModel model, string id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var existingEntry = _diaryEntryRepository.GetSingle(id);
            if (existingEntry == null)
            {
                var ownerId = HttpContext.User.Identity.Name;
                var creationTime = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();
                var story = new DiaryEntry
                {
                    Id = id,
                    Title = model.Title,
                    Content = model.Content,
                    Tags = model.Tags,
                    CreationTime = creationTime,
                    LastEditTime = creationTime,
                    OwnerId = ownerId,
                    Draft = true
                };

                _diaryEntryRepository.Add(story);
                _diaryEntryRepository.Commit();
            }
            else
            {
                existingEntry.Title = model.Title;
                existingEntry.LastEditTime = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();
                existingEntry.Tags = model.Tags;
                existingEntry.Content = model.Content;

                _diaryEntryRepository.Update(existingEntry);
                _diaryEntryRepository.Commit();
            }

            

            return new DiaryEntryCreateViewModel {
                EntryId = id
            };
        }
        
        [HttpPatch("{id}")]
        public ActionResult Patch(string id, [FromBody]DiaryEntryUpdateViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var ownerId = HttpContext.User.Identity.Name;
            if (!_diaryEntryRepository.IsOwner(id, ownerId)) return Forbid("You are not the owner of this story");

            var newStory = _diaryEntryRepository.GetSingle(id);
            newStory.Title = model.Title;
            newStory.LastEditTime = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();
            newStory.Tags = model.Tags;
            newStory.Content = model.Content;

            _diaryEntryRepository.Update(newStory);
            _diaryEntryRepository.Commit();

            return NoContent();
        }
        
        [HttpPost("{id}/publish")]
        public ActionResult Post(string id)
        {
            var ownerId = HttpContext.User.Identity.Name;
            if (!_diaryEntryRepository.IsOwner(id, ownerId)) return Forbid("You are not the owner of this story");

            var newStory = _diaryEntryRepository.GetSingle(id);
            newStory.Draft = false;
            newStory.PublishTime = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();

            _diaryEntryRepository.Update(newStory);
            _diaryEntryRepository.Commit();

            return NoContent();
        }
        
        [HttpGet("drafts")]
        public ActionResult<DraftsViewModel> Get()
        {
            var ownerId = HttpContext.User.Identity.Name;

            var drafts = _diaryEntryRepository.FindBy(story => story.OwnerId == ownerId && story.Draft);
            var draftsViewModel = new DraftsViewModel
            {
                DiaryEntries = drafts.Select(_mapper.Map<DraftViewModel>).ToList()
            };
            foreach (var entry in draftsViewModel.DiaryEntries)
            {
                entry.Content = _entryService.SubstringHtml(entry.Content, 95);
            }

            return draftsViewModel;
        }
        
        [HttpGet("user/{id}")]
        public ActionResult<DraftsViewModel> Get(string id)
        {
            var stories = _diaryEntryRepository.FindBy(story => story.OwnerId == id && !story.Draft);
            var draftsViewModel = new DraftsViewModel
            {
                DiaryEntries = stories.Select(_mapper.Map<DraftViewModel>).ToList()
            };
            foreach (var entry in draftsViewModel.DiaryEntries)
            {
                entry.Content = _entryService.SubstringHtml(entry.Content, 95);
            }

            return draftsViewModel;
        }

        [HttpGet("search/{term}")]
        public ActionResult<DiaryEntriesViewModel> GetStories(string term)
        {
            var stories = _diaryEntryRepository.FindBy(s => s.Content.Contains(term) || s.Title.Contains(term));
            var res = new DiaryEntriesViewModel
            {
                DiaryEntries = stories.Select(_mapper.Map<DiaryEntryViewModel>).ToList()
            };
            return res;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var ownerId = HttpContext.User.Identity.Name;
            if (!_diaryEntryRepository.IsOwner(id, ownerId)) return Forbid("You are not the owner of this story");

            _diaryEntryRepository.DeleteWhere(story => story.Id == id);
            _diaryEntryRepository.Commit();

            return NoContent();
        }
    }
}