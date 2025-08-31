using Application.Core;
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
		public class Query : IRequest<Result<List<Event>>>
		{ 

		}
		public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Event>>>
		{
			public async Task<Result<List<Event>>> Handle(Query request, CancellationToken cancellationToken)
			{
				var events = await context.Events.ToListAsync(cancellationToken);

				if (events == null) return Result<List<Event>>.Failure("Events not found.", 404);

				return Result<List<Event>>.Success(events);

				
			}
		}
	}
}
