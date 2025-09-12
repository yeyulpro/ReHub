using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Events.Dto
{
    public class CommentDto
    {
        
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Body { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public required string UserId { get; set; }// to return
        public required string DisplayName { get; set; }
        public string? ImageUrl { get; set; }


    }
}