using AutoMapper;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YourDiary.API.ViewModels.DiaryEntry;
using YourDiary.Model;

namespace YourDiary.API.ViewModels
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Model.DiaryEntry, DiaryEntryDetailsViewModel>()
                .ForMember(s => s.OwnerUsername, map => map.MapFrom(s => s.Owner.Username));
            CreateMap<Model.DiaryEntry, DraftViewModel>();
            CreateMap<Model.DiaryEntry, DiaryEntryViewModel>();
        }
    }
}