using MongoDB.Bson;
using MongoDB.Driver;
using SimpleApiBackend.Application.Interfaces;
using SimpleApiBackend.Domain.Entities;

namespace SimpleApiBackend.Infrastructure.Repositories;

public class OwnerMongoRepository : IOwnerRepository
{
    private readonly IMongoCollection<Owner> _owners;

    public OwnerMongoRepository(IMongoDatabase database)
    {
        _owners = database.GetCollection<Owner>("Owners");
    }

    public async Task<Owner?> GetOwnerByIdAsync(string id)
    {
        if (!ObjectId.TryParse(id, out var objectId))
        {
            return null;
        }

        var filter = Builders<Owner>.Filter.Eq(o => o.Id, objectId);

        return await _owners.Find(filter).FirstOrDefaultAsync();
    }
}