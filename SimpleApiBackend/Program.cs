using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen();

var properties = new List<Property>
{
    new Property (1, "Property 1", "123 Main St", 100000, "P1", 2020),
    new Property (2, "Property 2", "456 Main St", 200000, "P2", 2021),
    new Property (3, "Property 3", "789 Main St", 300000, "P3", 2022),
};

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/properties", ([FromQuery] string? q,[FromQuery] int? min, [FromQuery] int? max) => {
    IEnumerable<Property> filteredProperties = properties;

    if (!string.IsNullOrEmpty(q))
    {
        filteredProperties = filteredProperties.Where(p => p.Name.Contains(q, StringComparison.OrdinalIgnoreCase));
    }

    if (min.HasValue)
    {
        filteredProperties = filteredProperties.Where(p => p.Price >= min.Value);
    }

    if (max.HasValue)
    {
        filteredProperties = filteredProperties.Where(p => p.Price <= max.Value);
    }

    return filteredProperties;
});

app.MapGet("/properties/{id}", (int id) => properties.FirstOrDefault(p => p.Id == id));
app.MapPost("/properties", (Property property) => properties.Add(property));
app.MapPut("/properties/{id}", (int id, Property property) => {
    var existingProperty = properties.FirstOrDefault(p => p.Id == id);
    if (existingProperty != null) {
        existingProperty = property;
    }
    return existingProperty;
});
app.MapDelete("/properties/{id}", (int id) => {
    properties.RemoveAll(p => p.Id == id);
});

app.Run();


public record Property(int Id, string Name, string Address, int Price, string Code, int Year);