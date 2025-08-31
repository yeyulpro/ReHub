using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events.Queries
{
    public class GetEventDetails
    {
         public class Query : IRequest<Result<Event>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Event>>
        {
            public async Task<Result<Event>> Handle(Query request, CancellationToken cancellationToken)
            {
                var events = await context.Events.FindAsync(request.Id, cancellationToken );
                if (events == null) return Result<Event>.Failure("Event is not found.",404);

                return Result<Event>.Success(events);
            }
        }
    }
}