using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Command
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string TargetUserId { get; set; }
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await userAccessor.GetUserAsync();

                var target = await context.Users.FindAsync(request.TargetUserId, cancellationToken);

                if (target == null) return Result<Unit>.Failure("The Target user Not found", 404);

                var following = await context.UserFollowings.FindAsync([observer.Id, target.Id], cancellationToken);

                if (following == null)
                {
                    context.UserFollowings.Add(new UserFollowing { ObserverId = observer.Id, TargetId = target.Id });
                }
                else context.UserFollowings.Remove(following);


                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Fail updating following", 400);



            }
        }
    }
}