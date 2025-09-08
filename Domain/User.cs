using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
	public class User : IdentityUser
	{
		public string? DisplayName { get; set; }
		public string? Bio { get; set; }
		public string? ImageUrl { get; set; }

		//Navigation properties
		public ICollection<EventAttendee> Events { get; set; } = [];
		public ICollection<Photo> Photos { get; set; } = [];


	}
}
