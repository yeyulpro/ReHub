using Application.Core;
using Application.Events.Dto;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Events.Queries
{
	public class GetEventList
	{



		public class Query : IRequest<Result<PagedList<EventDto, DateTime?>>>
		{
			public required EventParams Params { get; set; }
		}
		public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<PagedList<EventDto, DateTime?>>>
		{
			public async Task<Result<PagedList<EventDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
			{

				var query = context.Events
							.OrderBy(x => x.Date)
							.Where(x => x.Date >= (request.Params.Cursor ?? request.Params.StartDate))
							.AsQueryable();

				if (!string.IsNullOrEmpty(request.Params.Filter))
				{
					query = request.Params.Filter switch
					{
						"isGoing" => query.Where(x => x.Attendees.Any(a => a.UserId == userAccessor.GetUserId())),
						"isHost" => query.Where(x => x.Attendees.Any(x=> x.IsHost && x.UserId == userAccessor.GetUserId())),
						_ => query
					};
				}
				var projectedEvents =  query.ProjectTo<EventDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() });

				var events = await projectedEvents.Take(request.Params.PageSize + 1)												
												.ToListAsync(cancellationToken);
				DateTime? nextCursor = null;
				if (events.Count > request.Params.PageSize)
				{
					nextCursor = events.Last().Date;
					events.RemoveAt(events.Count - 1);
				}
				return Result<PagedList<EventDto, DateTime?>>.Success(
					new PagedList<EventDto, DateTime?>
					{
						Items = events,
						NextCursor = nextCursor
					}
				);



			}
		}
	}
}
