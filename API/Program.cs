
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Add services to the container.
            var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            builder.Services.AddCors(options =>
                {
                    options.AddPolicy(name: MyAllowSpecificOrigins,
                                    policy =>
                                    {
                                        policy.WithOrigins("http://localhost:3002","https://localhost:3002")
                                        .AllowAnyHeader()
                                        .AllowAnyMethod();
                                    });
                });

            builder.Services.AddControllers();
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));


            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseCors(MyAllowSpecificOrigins);

            app.MapControllers();

            using var scope = app.Services.CreateScope();
            var service = scope.ServiceProvider;

            try
            {
                var context = service.GetRequiredService<AppDbContext>();
                await context.Database.MigrateAsync();
                await DbInitializer.SeedData(context);
            }
            catch (Exception ex)
            {
                var logger = service.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred during migraiton.");
            }

            app.Run();
        }


    }
}
