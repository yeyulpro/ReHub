
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.security
{
	public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
	{
		public async Task<User> GetUserAsync()
		{
			return await dbContext.Users.FindAsync(GetUserId())?? throw new UnauthorizedAccessException("No user found");		
		}

		public string GetUserId()
		{
			return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("No userfound");
		}
	}
}
