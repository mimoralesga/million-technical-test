using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SimpleApiBackend.Application.Features;
using SimpleApiBackend.Application.Features.ListProperties;
using SimpleApiBackend.Application.Interfaces;
using SimpleApiBackend.Infrastructure.Repositories;
using SimpleApiBackend.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("MongoDbConnection") ?? "mongodb://localhost:27017";
var databaseName = builder.Configuration["DatabaseSettings:DatabaseName"] ?? "PropertyDb";

builder.Services.AddSingleton<IMongoClient>(new MongoClient(connectionString));
builder.Services.AddScoped<MongoDbSeeder>(); 

builder.Services.AddScoped(sp => 
{
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(databaseName);
});

builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IPropertyRepository, PropertyMongoRepository>();
builder.Services.AddScoped<IOwnerRepository, OwnerMongoRepository>();
builder.Services.AddScoped<GetPropertyDetailsHandler>(); 
builder.Services.AddScoped<ListPropertiesHandler>(); 

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using var scope = app.Services.CreateScope();
    var seeder = scope.ServiceProvider.GetRequiredService<MongoDbSeeder>();
    await seeder.SeedDataAsync();
}

app.MapGet("/properties", async (ListPropertiesHandler handler, [AsParameters] PropertyFilterQuery query) => {
    var result = await handler.Handle(query);
    
    return Results.Ok(result);
});

app.MapGet("/properties/{id}", async (string id, GetPropertyDetailsHandler handler) => {
    var details = await handler.Handle(id);

    return details is not null
        ? Results.Ok(details)
        : Results.NotFound();           
});

app.Run();
