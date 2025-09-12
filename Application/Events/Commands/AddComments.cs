using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Events.Dto;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events.Commands
{
    public class AddComments
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public required string EventId { get; set; }
            public required string Body { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Command, Result<CommentDto>>
        {
            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var evt = await context.Events
                        .Include(x => x.Comments)
                        .ThenInclude(x => x.User)
                        .FirstOrDefaultAsync(x => x.Id == request.EventId, cancellationToken);

                if (evt == null) return Result<CommentDto>.Failure("Event not Found", 404);

                var currentUser = await userAccessor.GetUserAsync();
                var comment = new Comment { Body = request.Body, UserId = currentUser.Id, EventId = evt.Id };
                evt.Comments.Add(comment);
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                var commentDto = mapper.Map<CommentDto>(comment);
                return result ? Result<CommentDto>.Success(commentDto) : Result<CommentDto>.Failure("Fail to add commemt", 400);



            }
        }
    }
}