using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Profiles.DTOs
{
    public class UserEventDto
    {
        public required string Id { get; set; }
        public required string Title { get; set; }
        public required string Category { get; set; }
        public DateTime? Date { get; set; }

    }
}