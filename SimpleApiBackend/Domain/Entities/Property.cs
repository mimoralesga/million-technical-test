using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SimpleApiBackend.Domain.Entities;

public class Property
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }

    public required string Name { get; set; }
    public required string Address { get; set; }
    public int Price { get; set; }
    public required string CodeInternal { get; set; }
    public int Year { get; set; }

    [BsonRepresentation(BsonType.ObjectId)] 
    public ObjectId OwnerId { get; set; }    

    public List<PropertyImage> Images { get; set; } = new List<PropertyImage>();
    public List<PropertyTrace> Traces { get; set; } = new List<PropertyTrace>();
}