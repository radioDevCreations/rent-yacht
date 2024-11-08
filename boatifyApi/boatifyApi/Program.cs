

using boatifyApi;
using boatifyApi.Authorization;
using boatifyApi.Entities;
using boatifyApi.Middleware;
using boatifyApi.Models;
using boatifyApi.Models.Validators;
using boatifyApi.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using NLog;
using NLog.Web;
using System;
using System.Reflection;
using System.Text;

var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");


try
{
    var builder = WebApplication.CreateBuilder(args);

    var authenticationSettings = new AuthenticationSettings();
    builder.Configuration.GetSection("Authentication").Bind(authenticationSettings);
    // Add services to the container.

    builder.Services.AddSingleton(authenticationSettings);
    builder.Services.AddAuthentication(option =>
    {
        option.DefaultAuthenticateScheme = "Bearer";
        option.DefaultScheme = "Bearer";
        option.DefaultChallengeScheme = "Bearer";
    }).AddJwtBearer(cfg =>
    {
        cfg.RequireHttpsMetadata = false;
        cfg.SaveToken = true;
        cfg.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = authenticationSettings.JwtIssuer,
            ValidAudience = authenticationSettings.JwtIssuer,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey))
        };
    });
    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy("IsAdult", builder => builder.AddRequirements(new MinimumAgeRequirement(18)));
    });
    builder.Services.AddScoped<IAuthorizationHandler, MinimumAgeRequirementHandler>();
    builder.Services.AddControllers().AddFluentValidation();
    builder.Services.AddDbContext<BoatifyDbContext>();
    builder.Services.AddScoped<BoatifySeeder>();
    builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
    builder.Services.AddScoped<IAccountService, AccountService>();
    builder.Services.AddScoped<IHarbourService, HarbourService>();
    builder.Services.AddScoped<IBoatService, BoatService>();
    builder.Services.AddScoped<ExceptionHandlingMiddleware>();
    builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
    builder.Services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>();

    builder.Services.AddScoped<RequestTimeMiddleware>();
    builder.Services.AddSwaggerGen();

    builder.Logging.ClearProviders();
    builder.Host.UseNLog();

    var app = builder.Build();

    // Configure the HTTP request pipeline.

    using (var harbourSeeder = app.Services.CreateScope())
    {
        var scopedService = harbourSeeder.ServiceProvider.GetRequiredService<BoatifySeeder>();
        scopedService.Seed();
    }

    if (app.Environment.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseMiddleware<ExceptionHandlingMiddleware>();
    app.UseMiddleware<RequestTimeMiddleware>();
    app.UseAuthentication();
    app.UseHttpsRedirection();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Boatify API");
    });
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
}
catch (Exception exception)
{
    // NLog: catch setup errors
    logger.Error(exception, "Stopped program because of exception");
    throw;
}
finally
{
    // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
    NLog.LogManager.Shutdown();
}