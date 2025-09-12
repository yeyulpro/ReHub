using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Events.Commands;
using Application.Events.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class CommentHub(IMediator mediator) : Hub
    {
        public async Task SendComment(AddComments.Command command)
        {
            var comment = await mediator.Send(command);
            await Clients.Group(command.EventId).SendAsync("ReceiveComment", comment.Value);
        }
        public override async Task OnConnectedAsync()
        {

            var httpContext = Context.GetHttpContext();
            var eventId = httpContext?.Request.Query["eventId"];

            if (string.IsNullOrEmpty(eventId)) throw new HubException("No Event with this Id");
            await Groups.AddToGroupAsync(Context.ConnectionId, eventId!);

            var result = await mediator.Send(new GetComments.Query { EventId = eventId! });
            await Clients.Caller.SendAsync("LoadComments", result.Value);


        }
    }
}