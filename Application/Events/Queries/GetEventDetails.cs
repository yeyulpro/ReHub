using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Events.Dto;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events.Queries
{
    public class GetEventDetails
    {
        public class Query : IRequest<Result<EventDto>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<EventDto>>
        {
            public async Task<Result<EventDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var evt = await context.Events
                                    .ProjectTo<EventDto>(mapper.ConfigurationProvider)
                                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (evt == null) return Result<EventDto>.Failure("Event is not found.", 404);
                return Result<EventDto>.Success(evt);
            }
        }
    }
}