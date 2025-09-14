using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Events.Queries
{
    public class EventParams : PaginationParams<DateTime?>
    {
        public string? Filter { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}