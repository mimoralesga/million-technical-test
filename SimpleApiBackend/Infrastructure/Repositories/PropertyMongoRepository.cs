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

    public async Task<List<Property>> ListPropertiesAsync()
    {
        return await _properties.Find(_ => true).ToListAsync();
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