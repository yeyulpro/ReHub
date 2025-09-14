using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.Internal.Mappers;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Query
{
    public class GetUserEvent
    {
        public class Query : IRequest<Result<List<UserEventDto>>>
        {
            public required string UserId { get; set; }
            public required string Filter { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<UserEventDto>>>
        {
            public async Task<Result<List<UserEventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.EventAttendees
                    .Where(u => u.User.Id == request.UserId)
                    .OrderBy(a => a.Event.Date)
                    .Select(x => x.Event)
                    .AsQueryable();

                var today = DateTime.UtcNow;

                query = request.Filter switch
                {
                    "past" => query.Where(a => a.Date <= today && a.Attendees.Any(x => x.UserId == request.UserId)),
                    "hosting" => query.Where(a => a.Attendees.Any(x => x.IsHost && x.UserId == request.UserId)),
                    _ => query.Where(a => a.Date >= today && a.Attendees.Any(x => x.UserId == request.UserId))
                };
                var projectedEvents = query.ProjectTo<UserEventDto>(mapper.ConfigurationProvider, cancellationToken);

                var events = await projectedEvents.ToListAsync(cancellationToken);
                return Result<List<UserEventDto>>.Success(events);

            }
        }
    }
}