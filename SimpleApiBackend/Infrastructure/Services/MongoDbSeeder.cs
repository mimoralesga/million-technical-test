using MongoDB.Driver;
using SimpleApiBackend.Domain.Entities;

namespace SimpleApiBackend.Infrastructure.Services;

public class MongoDbSeeder(IMongoDatabase database)
{
    private readonly IMongoDatabase _database = database;

    public async Task SeedDataAsync()
    {
        var ownersCollection = _database.GetCollection<Owner>("Owners");
        var propertiesCollection = _database.GetCollection<Property>("Properties");

        if (await propertiesCollection.EstimatedDocumentCountAsync() == 0)
        {
            var jane = new Owner
            {
                Name = "Jane Doe",
                Address = "123 Main St",
                Birthday = new DateTime(1990, 1, 1),
                Photo = "/jhane.webp"
            };

            var jhon = new Owner
            {
                Name = "Jhon Doe",
                Address = "123 Main St",
                Birthday = new DateTime(1988, 10, 1),
                Photo = "/jhon.webp"
            };

            var traces = new List<PropertyTrace>
            {
                new()
                {
                    DateSale = new DateTime(2023, 1, 1, 0, 0, 0),
                    Name = "Initial List Price",
                    Value = 15000000,
                    Tax = 50000
                },
                new()
                {
                    DateSale = new DateTime(2023, 6, 15, 0, 0, 0),
                    Name = "Market Price Reduction",
                    Value = 14500000,
                    Tax = 0
                },
                new()
                {
                    DateSale = new DateTime(2024, 3, 10, 0, 0, 0),
                    Name = "Sale Closed",
                    Value = 14250000,
                    Tax = 2850
                }
            };

            await ownersCollection.InsertManyAsync([jane, jhon]);

            await propertiesCollection.InsertManyAsync(
                [
                    new Property {
                        OwnerId = jane.Id,
                        Address = "10245 Collins Ave",
                        CodeInternal = "RBH-46",
                        Price = 26696900,
                        Name = "Rivage Bal Harbour",
                        Images = [
                            new PropertyImage {
                                FileUrl = "/RBH-46.webp",
                                Enabled = true
                            }
                        ],
                        Traces = traces,
                        Year = 2025
                    },
                    new Property {
                        OwnerId = jane.Id,
                        Address = "10245 Collins Ave",
                        CodeInternal = "RBH-45",
                        Price = 24500000,
                        Name = "Rivage Bal Harbour",
                        Images = [
                            new PropertyImage {
                                FileUrl = "/RBH-45.webp",
                                Enabled = true
                            }
                        ],
                        Traces = traces,
                        Year = 2020
                    },
                    new Property {
                        OwnerId = jhon.Id,
                        Address = "9520 W Broadview Dr",
                        CodeInternal = "BHI-89",
                        Price = 21950000,
                        Name = "Bay Harbor Islands",
                        Images = [
                            new PropertyImage {
                                FileUrl = "/BHI-89.webp",
                                Enabled = true
                            }
                        ],
                        Traces = traces,
                        Year = 2010
                    },
                ]
            );

            Console.WriteLine("Data seeded successfully!");
        }
    }
}