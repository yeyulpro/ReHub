using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Events.Dto;
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

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
        {
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
               
                var evt = mapper.Map<Event>(request.EventDto);
                context.Events.Add(evt);

                var isCreated =await context.SaveChangesAsync(cancellationToken)>0;
                return isCreated ? Result<string>.Success(evt.Id) : Result<string>.Failure("Failed to create an event", 400);

              
            }
        }
    }
}