using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SimpleApiBackend.Domain.Entities;

public class Owner
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }

    public string Name { get; set; }
    public string Address { get; set; }
    public string Photo { get; set; }
    public DateTime Birthday { get; set; }
}