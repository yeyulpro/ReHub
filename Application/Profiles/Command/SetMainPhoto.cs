using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Command
{
    public class SetMainPhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string PhotoId { get; set; }
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserWithPhotosAsync();

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

                if (photo == null) return Result<Unit>.Failure("Can't find the photo", 404);

                user.ImageUrl = photo.Url;

                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Fail to update the main photo", 400);
            }


        }
    }
}