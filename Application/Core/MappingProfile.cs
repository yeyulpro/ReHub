using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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
            var currentUserId = "";
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
            .ForMember(d => d.Id, o => o.MapFrom(e => e.User.Id))
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.User.Followings.Count))
            .ForMember(d => d.FollowingsCount, o => o.MapFrom(s => s.User.Followers.Count))
            .ForMember(d => d.Following, o => o.MapFrom(o => o.User.Followers.Any(f => f.ObserverId == currentUserId)));

            CreateMap<User, UserProfile>()
                        .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                        .ForMember(d => d.FollowingsCount, o => o.MapFrom(s => s.Followings.Count))
                        .ForMember(d => d.Following, o => o.MapFrom(o => o.Followers.Any(f => f.ObserverId == currentUserId)));


            CreateMap<Comment, CommentDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(c => c.User.DisplayName))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(c => c.User.ImageUrl));
        }

    }
}