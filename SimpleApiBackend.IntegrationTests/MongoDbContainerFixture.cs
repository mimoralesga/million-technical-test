using NUnit.Framework;
using Testcontainers.MongoDb;

public class MongoDbContainerFixture
{
    private readonly MongoDbContainer _mongoDbContainer = new MongoDbBuilder()
        .WithImage("mongo:latest")
        .Build();

    public string ConnectionString => _mongoDbContainer.GetConnectionString();

    public Task InitializeAsync()
    {
        Console.WriteLine("Starting MongoDB container...");
        return _mongoDbContainer.StartAsync();
    }

    public Task DisposeAsync()
    {
        Console.WriteLine("Stopping a MongoDB container...");
        return _mongoDbContainer.DisposeAsync().AsTask();
    }
}