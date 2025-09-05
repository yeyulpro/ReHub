using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Security.Authentication.ExtendedProtection;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
	public class DbInitializer
	{
		public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
		{
			var users = new List<User>
				{
					new() {Id="bob-id",DisplayName="Bob", UserName= "bob@test.com", Email= "bob@test.com"},
					new() { Id = "jane-id", DisplayName="Jane", UserName="jane@test.com", Email= "jane@test.com" },
					new() { Id = "tom-id", DisplayName="Tom", UserName="tom@test.com", Email= "tom@test.com" }
				};

			if (!userManager.Users.Any())
			{

				foreach (var user in users)
				{
					await userManager.CreateAsync(user, "Passw0rd!");
				}

			}


			if (context.Events.Any()) return;

			var events = new List<Event>
			{
				new() {
				Title = "Real Estate Portfolio Strategies for Beginners",
				Date = DateTime.Now.AddDays(2),
				Description = "Learn how to build and manage a profitable real estate portfolio as a beginner investor.",
				Category = "investment",
				City = "Toronto",
				Venue = "Toronto City Hall, 100 Queen St W, Toronto, ON M5H 2N2",
				Latitude = 43.653908,
				Longitude =-79.384293,
				Attendees =
				[
					new()
					{
						UserId = users[0].Id,
						IsHost = true,
					},
					new()
					{
						UserId = users[1].Id,
						IsHost = false,
					}
				]
			},
			new() {
				Title = "Key Points of Rental Agreements",
				Date = DateTime.Now.AddMonths(1),
				Description = "Understand the essential clauses in rental contracts and protect your rights as a landlord or tenant.",
				Category = "legal",
				City = "Toronto",
				Venue = "Exhibition Place,100 Princes' Blvd,Toronto, ON M6K 3C3",
				Latitude = 43.635040,
				Longitude = -79.412468,
				Attendees =
				[
					new()
					{
						UserId = users[1].Id,
						IsHost = true,
					},
					new()
					{
						UserId = users[2].Id
					},
					new()
					{
						UserId = users[0].Id,
					}
				]
			},
			new() {
				Title = "Regional Development Plan Update Seminar",
				Date = DateTime.Now.AddMonths(1),
				Description = "Insights into upcoming regional development projects and their impact on real estate opportunities.",
				Category = "news",
				City = "Toronto",
				Venue = "Yonge-Dundas Square,2 Carlton Street, Suite 1707 Toronto, Ontario, M5B 1J3  ",
				Latitude = 43.656071,
				Longitude = -79.380280,
				Attendees =
				[
					new()
					{
						UserId = users[2].Id,
						IsHost = true,
					}
				]
			
			},
			new() {
				Title = "Rental Property Income Analysis Workshop",
				Date = DateTime.Now.AddMonths(2),
				Description = "Hands-on session to calculate rental income, ROI, and cash flow for investment properties.",
				Category = "investment",
				City = "Toronto",
				Venue = "Ontario Place, 955 Lake Shore Blvd W, Toronto, ON M6K 3B9",
				Latitude = 43.6286,
				Longitude = -79.4500,
				Attendees =
				[
					new()
					{
						UserId = users[0].Id,
						IsHost = true,
					},
					new()
					{
						UserId = users[2].Id
					}
				]
			},
			new()
			{
				Title = "Real Estate Tax Filing Workshop",
				Date = DateTime.Now.AddMonths(3),
				Description = "Learn how to prepare and file real estate-related taxes efficiently with practical examples.",
				Category = "education",
				City = "London",
				Venue = "The Mayflower",
				Latitude = 51.501778,
				Longitude = -0.053577,
				Attendees =
				[
					new()
					{
						UserId = users[1].Id,
						IsHost = true,
					}
				]
			},
			new()
			{
				Title = "New Housing Law Updates Seminar",
				Date = DateTime.Now.AddMonths(4),
				Description = "Stay updated on the latest changes in housing regulations and compliance requirements.",
				Category = "legal",
				City = "Hamilton",
				Venue = "Hamilton City Hall,71 Main St W, Hamilton, ON L8P 1P9",
				Latitude = 43.2552,
				Longitude = -79.8711,
				Attendees =
				[
					new()
					{
						UserId = users[2].Id,
						IsHost = true,
					},
					new()
					{
						UserId = users[0].Id
					}
				]
			},
			new()
			{
				Title = "Landlord Forum: Experience Sharing & Q&A",
				Date = DateTime.Now.AddMonths(5),
				Description = "Discuss challenges and solutions with fellow landlords and get expert advice in a Q&A format.",
				Category = "networking",
				City = "Ottawa",
				Venue = "Ottawa City Hall,110 Laurier Ave W, Ottawa, ON K1P 1J1",
				Latitude = 45.4215,
				Longitude = -75.6972,
				Attendees =
				[
					new()
					{
						UserId = users[0].Id,
						IsHost = true,
					}
				]
			},
			new()
			{
				Title = "Housing Policy Change Briefing",
				Date = DateTime.Now.AddMonths(2),
				Description = "Overview of recent policy changes affecting housing markets and property ownership.",
				Category = "news",
				City = "Markham",
				Venue = "Markham Civic Centre,101 Town Centre Blvd, Markham, ON L3R 9W3",
				Latitude = 51.5432505,
				Longitude = -79.2611,
				Attendees =
				[
					new()
					{
						UserId = users[1].Id,
						IsHost = true,
					},
					new()
					{
						UserId = users[0].Id
					}
				]
			},
			new()
			{
				Title = "Local Real Estate Professionals Networking",
				Date = DateTime.Now.AddMonths(3),
				Description = "Connect with local real estate agents, investors, and professionals to share insights and opportunities.",
				Category = "networking",
				City = "Mississauga",
				Venue = "Mississauga Civic Centre,300 City Centre Dr, Mississauga, ON L5B 3C1",
				Latitude = 43.5890,
				Longitude =-79.6440,
				Attendees =
				[
					new()
					{
						UserId = users[2].Id,
						IsHost = true,
					},
					new()
					{
						UserId = users[1].Id
					}
				]
			},
			new()
			{
				Title = "First-Time Homebuyer Bootcamp",
				Date = DateTime.Now.AddDays(10),
				Description = "Step-by-step guidance for first-time homebuyers on financing, legal steps, and property selection.",
				Category = "education",
				City = " The Blue Mountains",
				Venue = "Village Conference Centre,242 Jozo Weider Blvd, The Blue Mountains, ON L9Y 3Z2",
				Latitude = 44.4994,
				Longitude = -80.3730,
				Attendees =
				[
					new()
					{
						UserId = users[0].Id,
						IsHost = true,
					}
				]
			}
			};

			context.Events.AddRange(events);
			await context.SaveChangesAsync();



		}
	}
}
