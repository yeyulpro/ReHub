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
		public required DbSet<EventAttendee> EventAttendees { get; set; }
		public required DbSet<Photo> Photos { get; set; }
		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
			builder.Entity<EventAttendee>(x => x.HasKey(e => new { e.EventId, e.UserId }));
			builder.Entity<EventAttendee>().HasOne(x => x.User).WithMany(u => u.Events).HasForeignKey(x => x.UserId);
			builder.Entity<EventAttendee>().HasOne(x => x.Event).WithMany(e => e.Attendees).HasForeignKey(x => x.EventId);
        }
	}
}
