using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events.Commands
{
    public class DeleteEvent
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var evt = await context.Events.FindAsync(request.Id, cancellationToken);
                if (evt == null) return Result<Unit>.Failure("Not Found", 404);
                context.Events.Remove(evt);
                var isDeleted = await context.SaveChangesAsync(cancellationToken) > 0;
                return isDeleted ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to delete the event", 400);
            }
        }
    }


}