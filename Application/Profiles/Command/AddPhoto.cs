using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Command
{
    public class AddPhoto
    {
        public class Command : IRequest<Result<Photo>>
        {
            public required IFormFile File { get; set; }
        }

        public class Handler(IPhotoService photoService, IUserAccessor userAccessor, AppDbContext context)
         : IRequestHandler<Command, Result<Photo>>
        {
            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {

                var uploadResult = await photoService.UploadPhoto(request.File);
                if (uploadResult == null) return Result<Photo>.Failure("Failed to upload a photo", 404);
                var user = await userAccessor.GetUserAsync();

                var photo = new Photo
                {
                    Url = uploadResult.Url,
                    PublicId = uploadResult.PublicId,
                    UserId = user.Id
                };

                user.ImageUrl ??= photo.Url;

                context.Photos.Add(photo);
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result ? Result<Photo>.Success(photo) : Result<Photo>.Failure("Fail to save a photo in DB", 400);  
                


            }
        }
    }
}