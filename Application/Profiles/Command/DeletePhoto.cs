using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Command
{
    public class DeletePhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string PhotoId { get; set; }
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor, IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserWithPhotosAsync();

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

                if(photo == null) return Result<Unit>.Failure("Can't find the photo", 400);

                if (photo.Url == user.ImageUrl) return Result<Unit>.Failure("Cannot delete main photo", 400);
       
                var deleteResult = await photoService.DeletePhoto(photo.PublicId);
               
              
                context.Photos.Remove(photo);
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Fail to delete the photo", 400);
            }
        }
    }
}