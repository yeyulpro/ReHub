using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events.Commands
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }

        public class Handler(IUserAccessor userAccessor, AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var evt = await context.Events
                                        .Include(e => e.Attendees)
                                        .ThenInclude(e => e.User)
                                        .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

                if (evt == null) return Result<Unit>.Failure("No event is found", 404);

                var user = await userAccessor.GetUserAsync();

                var attendance = evt.Attendees.FirstOrDefault(x => x.UserId == user.Id);
                var isHost = evt.Attendees.Any(x => x.IsHost && x.UserId == user.Id);

                if (attendance != null)
                {
                    if (isHost) evt.isCancelled = !evt.isCancelled;
                    else evt.Attendees.Remove(attendance);
                }
                else
                {
                    var newMember = new EventAttendee()
                    {
                        UserId = user.Id,
                        EventId = evt.Id,
                        IsHost = false
                    };
                    evt.Attendees.Add(newMember);
                }
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating the DB.", 400);

            }
        }
    }
}