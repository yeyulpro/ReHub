using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Query
{
    public class GetProfilePhotos
    {
        public class Query : IRequest<Result<List<Photo>>>
        {
            public required string UserId { get; set; }
        }

        public class Handller(AppDbContext context) : IRequestHandler<Query, Result<List<Photo>>>
        {
            public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var photos = await context.Users
                                .Where(x => x.Id == request.UserId)
                                .SelectMany(x => x.Photos)
                                .ToListAsync(cancellationToken);

                return Result<List<Photo>>.Success(photos);
                            

            }
        }
    }
}