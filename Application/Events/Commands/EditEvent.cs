using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Events.Dto;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Persistence;

namespace Application.Events.Commands
{
    public class EditEvent
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required EditEventDto EventDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var evt = await context.Events.FindAsync(request.EventDto.Id, cancellationToken);
                if (evt==null) return Result<Unit>.Failure("Event not Found", 404);
                mapper.Map(request.EventDto, evt);

                var isSaved = await context.SaveChangesAsync(cancellationToken)>0;
                return isSaved ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to update event.", 400);

               
            }
        }
    }
}