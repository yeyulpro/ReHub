using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Application.Core;
using Application.Events.Commands;
using Application.Events.Dto;
using Application.Events.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<Result<List<EventDto>>>> GetEvents()
        {
            var result = await Mediator.Send(new GetEventList.Query());
            return Ok(result.Value);

        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Result<EventDto>>> GetEventById(string id)
        {
            var result = await Mediator.Send(new GetEventDetails.Query { Id = id });
            if (!result.IsSuccess && result.Code == 404) return NotFound();
            if (result.IsSuccess && result.Value != null) return Ok(result.Value);
            return BadRequest(result.Error);


        }
        [HttpPost]
        public async Task<ActionResult<Result<string>>> CreateEvent(CreateEventDto evtDto)
        {
           
            var result = await Mediator.Send(new CreateEvent.Command { EventDto = evtDto });
            return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);
        }

        [HttpPut("{id}")]
        [Authorize(Policy ="IsActivityHost")]
        public async Task<ActionResult> UpdateEvent(EditEventDto evtDto, string id)
        {
			evtDto.Id = id;
			var result = await Mediator.Send(new EditEvent.Command { EventDto = evtDto });
            if (!result.IsSuccess && result.Code == 404) return NotFound();

            return (result.IsSuccess) ? Ok(result.Value) : BadRequest(result.Error);
        }

        [HttpDelete("{id}")]
		[Authorize(Policy = "IsActivityHost")]
		public async Task<ActionResult<Result<Unit>>> DeleteEvent(string id)
        {
            var result = await Mediator.Send(new DeleteEvent.Command { Id = id });

            if (!result.IsSuccess && result.Code == 404) return NotFound();
            return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);

        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Result<Unit>>> Attend(string id)
        {
            var result = await Mediator.Send(new UpdateAttendance.Command { Id = id });
           
            return result.IsSuccess ? Ok(result.Value): BadRequest(result.Error);
            
        }
    }
}