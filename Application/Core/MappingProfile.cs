using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Application.Events.Dto;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Event, CreateEventDto>();
            CreateMap<CreateEventDto, Event>();
            CreateMap<EditEventDto, Event>();
            CreateMap<Event, CreateEventDto>();

            CreateMap<Event, EventDto>()
                .ForMember(d => d.HostDisplayName, o => o.MapFrom(s => s.Attendees.FirstOrDefault(a => a.IsHost)!.User.DisplayName))
                .ForMember(d => d.HostId, o => o.MapFrom(s => s.Attendees.FirstOrDefault(a => a.IsHost)!.User.Id));
            CreateMap<EventAttendee, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(e => e.User.DisplayName))
            .ForMember(d => d.Bio, o => o.MapFrom(e => e.User.Bio))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(e => e.User.ImageUrl))
            .ForMember(d => d.Id, o => o.MapFrom(e => e.User.Id));

            CreateMap<User, UserProfile>();
        }

    }
}