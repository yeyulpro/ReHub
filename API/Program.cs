
using System.Threading.Tasks;
using API.Middlewares;
using Application;
using Application.Events.Dto;
using Application.Events.Queries;
using Application.Events.Validators;
using FluentValidation;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Application.Interfaces;
using Microsoft.AspNetCore.Authentication.Cookies;
using Infrastructure.security;
using Infrastructure.Photos;
using API.SignalR;



namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Add services to the container.
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            builder.Services.AddCors(options =>
                {
                    options.AddPolicy(MyAllowSpecificOrigins,
                                    policy =>
                                    {
                                        policy
                                        .AllowCredentials()
                                        .WithOrigins("https://localhost:3002")
                                        .AllowAnyHeader()
                                        .AllowAnyMethod();

                                    });
                });
            builder.Services.AddSignalR();
            builder.Services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            });
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddMediatR(x =>
            {
                x.RegisterServicesFromAssemblyContaining<GetEventList.Handler>();
                x.AddOpenBehavior(typeof(ValidationBehavior<,>));
            });
            builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));

            builder.Services.AddScoped<IUserAccessor, UserAccessor>();
            builder.Services.AddScoped<IPhotoService, PhotoService>();
            builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);
            builder.Services.AddValidatorsFromAssemblyContaining<CreateEventValidator>();
            builder.Services.AddTransient<ExceptionMiddleware>();


            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = true;
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });




            builder.Services.AddIdentityApiEndpoints<User>(opt =>
            {
                opt.User.RequireUniqueEmail = true;
            }).AddRoles<IdentityRole>().AddEntityFrameworkStores<AppDbContext>();


            builder.Services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsActivityHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });
            builder.Services.AddScoped<IAuthorizationHandler, IsHostRequirementHandler>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.MapGroup("api").MapIdentityApi<User>();
            app.MapHub<CommentHub>("/comments");

            using var scope = app.Services.CreateScope();
            var service = scope.ServiceProvider;

            try
            {
                var context = service.GetRequiredService<AppDbContext>();
                var userManager = service.GetRequiredService<UserManager<User>>();
                await context.Database.MigrateAsync();
                await DbInitializer.SeedData(context, userManager);
            }
            catch (Exception ex)
            {
                var logger = service.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred during migration.");
            }

            app.Run();
        }


    }
}
