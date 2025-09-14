using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Profiles;
using Application.Profiles.Command;
using Application.Profiles.Query;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace API.Controllers
{
  public class ProfilesController : BaseApiController
  {
    [HttpPost("add-photo")]
    public async Task<ActionResult<Result<Photo>>> AddPhoto([FromForm] IFormFile file)
    {
      var result = await Mediator.Send(new AddPhoto.Command { File = file });
      if (!result.IsSuccess) return BadRequest(result.Error);
      return Ok(result.Value);
    }
    [HttpGet("{userId}/photos")]
    public async Task<ActionResult<Result<List<Photo>>>> GetPhotos(string userId)
    {
      var result = await Mediator.Send(new GetProfilePhotos.Query { UserId = userId });
      if (!result.IsSuccess) return BadRequest(result.Error);
      return Ok(result.Value);
    }

    [HttpDelete("{photoId}/photos")]
    public async Task<ActionResult> DeletePhoto(string photoId)
    {
      var result = await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId });
      if (!result.IsSuccess) return BadRequest(result.Error);
      return Ok(result.Value);
    }

    [HttpPut("{photoId}/setMainPhoto")]
    public async Task<ActionResult> SetMainPhoto(string photoId)
    {
      var result = await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId });
      if (!result.IsSuccess) return BadRequest(result.Error);
      return Ok(result.Value);
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult> GetProfile(string userId)
    {
      var result = await Mediator.Send(new GetProfile.Query { UserId = userId });
      if (!result.IsSuccess) return BadRequest(result.Error);
      return Ok(result.Value);
    }
    [HttpPut]
    public async Task<ActionResult> UpdateProfile([FromBody] EditProfile.Command command)
    {
      var result = await Mediator.Send(command);
      if (!result.IsSuccess) return BadRequest(result.Error);
      return Ok(result.Value);
    }

    [HttpPost("{targetUserId}/follow")]
    public async Task<ActionResult> FollowToggle(string targetUserId)
    {
      var result = await Mediator.Send(new FollowToggle.Command { TargetUserId = targetUserId });
      if (!result.IsSuccess) return BadRequest(result.Error);
      return Ok(result.Value);
    }

    [HttpGet("{userId}/follow-list")]
    public async Task<ActionResult> GetFollowings(string userId, string predicate)
    {
      var result = await Mediator.Send(new GetFollowings.Query { UserId = userId, Predicate = predicate });
      if (!result.IsSuccess) return BadRequest(result.Error);
      return Ok(result.Value);
    }
  }
}