using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Events.Dto;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Events.Commands
{
    public class CreateEvent
    {
        public class Command : IRequest<Result<string>>
        {
            public required CreateEventDto EventDto { get; set; }
			
		}

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
        {
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();
			
				var evt = mapper.Map<Event>(request.EventDto);
                context.Events.Add(evt);

                var attendee = new EventAttendee
                {
                    UserId = user.Id,
                    EventId = evt.Id,
                    IsHost = true
                };
                evt.Attendees.Add(attendee);
                 

                var isCreated =await context.SaveChangesAsync(cancellationToken)>0;
                return isCreated ? Result<string>.Success(evt.Id) : Result<string>.Failure("Failed to create an event", 400);

              
            }
        }
    }
}