using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Events.Dto;
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

        }

    }
}