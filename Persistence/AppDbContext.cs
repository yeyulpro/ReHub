using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Persistence
{
	public class AppDbContext(DbContextOptions options) : DbContext(options)
	{
		
		
		public required DbSet<Event> Events { get; set; }
	}
}
