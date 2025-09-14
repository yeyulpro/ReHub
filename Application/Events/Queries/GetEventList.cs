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
		public class Query : IRequest<Result<List<EventDto>>>
		{ 

		}
		public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<List<EventDto>>>
		{
			public async Task<Result<List<EventDto>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var events = await context.Events
												.ProjectTo<EventDto>(mapper.ConfigurationProvider,new {currentUserId = userAccessor.GetUserId()})
												.ToListAsync(cancellationToken);

				if (events == null) return Result<List<EventDto>>.Failure("Events not found.", 404);

				return Result<List<EventDto>>.Success(events);

				
			}
		}
	}
}
