using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class EventsController(AppDbContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Event>>> GetEvents()
        {
            return await context.Events.ToListAsync();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEventsById(string id)
        {
            var evt = await context.Events.FindAsync(id);
            if (evt == null) return NotFound();
            return Ok(evt); 
            
        }
    }
}