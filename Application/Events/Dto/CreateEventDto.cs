using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Events.Dto
{
    public class CreateEventDto :BaseEventDto
    {
		public string Id { get; set; } = Guid.NewGuid().ToString();

	}
}