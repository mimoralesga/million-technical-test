using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SimpleApiBackend.Domain.Entities;

public class Property
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }

    public string Name { get; set; }
    public string Address { get; set; }
    public int Price { get; set; }
    public string CodeInternal { get; set; }
    public int Year { get; set; }

    [BsonRepresentation(BsonType.ObjectId)] 
    public ObjectId OwnerId { get; set; }    

    public List<PropertyImage> Images { get; set; } = [];
    public List<PropertyTrace> Trace { get; set; } = [];
}