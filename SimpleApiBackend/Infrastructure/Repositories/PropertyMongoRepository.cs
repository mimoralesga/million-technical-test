using MongoDB.Bson;
using MongoDB.Driver;
using SimpleApiBackend.Application.Interfaces;
using SimpleApiBackend.Domain.Entities;

namespace SimpleApiBackend.Infrastructure.Repositories;

public class PropertyMongoRepository : IPropertyRepository
{
    private readonly IMongoCollection<Property> _properties;

    public PropertyMongoRepository(IMongoDatabase database)
    {
        _properties = database.GetCollection<Property>("Properties");
    }

    public async Task<List<Property>> ListPropertiesAsync(string? q, int? min, int? max)
    {
        var filter = Builders<Property>.Filter.Empty;

        if (!string.IsNullOrWhiteSpace(q))
        {
            var qFilter = Builders<Property>.Filter.Regex(
                p => p.Name, 
                new BsonRegularExpression(q, "i")
            );
            filter &= qFilter;
        }

        if (min.HasValue)
        {
            var minFilter = Builders<Property>.Filter.Gte(p => p.Price, min.Value);
            filter &= minFilter;
        }

        if (max.HasValue)
        {
            var maxFilter = Builders<Property>.Filter.Lte(p => p.Price, max.Value);
            filter &= maxFilter;
        }

        return await _properties.Find(filter).ToListAsync();
    }

    public async Task<Property?> GetPropertyByIdAsync(string id)
    {
        if (!ObjectId.TryParse(id, out var objectId))
        {
            return null;
        }
        
        var filter = Builders<Property>.Filter.Eq(p => p.Id, objectId);

        return await _properties.Find(filter).FirstOrDefaultAsync();
    }
}