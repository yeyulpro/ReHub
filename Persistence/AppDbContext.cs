using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Persistence
{
	public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
	{	
		
		public required DbSet<Event> Events { get; set; }
	}
}
