using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NasaSpaceInfo.DAO;
using NasaSpaceInfo.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NasaSpaceInfo
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Configuration.GetConnectionString("Project");

            services.AddControllers();
            services.AddTransient<IApod>(sp => new ApodApiService());
            services.AddTransient<IQuote>(sp => new QuotesApiService());
            services.AddTransient<ICatPic>(sp => new CatPicApiService());
            services.AddTransient<ICatFact>(sp => new CatFactApiService());
            services.AddTransient<IChuckJokes>(sp => new ChuckJokesApiService());
            services.AddTransient<ICatFactDao>(sp => new CatCardSqlDao(connectionString));
            services.AddTransient<ISubscribe>(sp => new SubscribeSqlDao(connectionString));
            services.AddTransient<IWeather>(sp => new WeatherApiService());
            services.AddTransient<IHealth>(sp => new HealthApiService());
            services.AddTransient<IDrinks>(sp => new CocktailApiService());
            services.AddTransient<ICreateImage>(sp => new ImageApiService());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles(); //to open index.html file when the program runs

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
