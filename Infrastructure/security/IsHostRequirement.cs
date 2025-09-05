using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
        
    }

	public class IsHostRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<IsHostRequirement>
	{
		protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
		{
			var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
			if (userId == null) return;

			var httpContext = httpContextAccessor.HttpContext;
			if (httpContext?.GetRouteValue("id") is not string eventId) return;

			var attendee = await dbContext.EventAttendees.SingleOrDefaultAsync(x=>x.UserId == userId && x.EventId ==eventId) ;
			if(attendee == null) return;
			if (attendee.IsHost) context.Succeed(requirement);
		
		}
	}
}