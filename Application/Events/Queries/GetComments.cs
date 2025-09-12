using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Events.Dto;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events.Queries
{
    public class GetComments
    {
        public class Query : IRequest<Result<List<CommentDto>>>
        {
            public required string EventId { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<CommentDto>>>
        {
            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var comments = await context.Comments
                                .Where(x => x.EventId == request.EventId)
                                .OrderByDescending(x => x.CreatedAt)
                                .ProjectTo<CommentDto>(mapper.ConfigurationProvider, cancellationToken)
                                .ToListAsync(cancellationToken);

                if (comments == null) return Result<List<CommentDto>>.Failure("No comment list is found", 404);
                return Result<List<CommentDto>>.Success(comments);



            }
        }
    }


}