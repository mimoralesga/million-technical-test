using System.Net;
using System.Net.Http.Json;
using NUnit.Framework;
using SimpleApiBackend.Application.Features.ListProperties;
using SimpleApiBackend.Application.Features;

[TestFixture]
public class PropertiesEndpointTests
{
    private HttpClient _client;
    private static MongoDbContainerFixture _dbFixture = new();

    [OneTimeSetUp]
    public async Task GlobalSetup()
    {
        await _dbFixture.InitializeAsync();
        
        var factory = new CustomWebApplicationFactory(_dbFixture.ConnectionString);
        
        _client = factory.CreateClient();
    }
    
    [OneTimeTearDown]
    public async Task GlobalTeardown()
    {
        await _dbFixture.DisposeAsync(); 
        _client?.Dispose();
    }

    [Test]
    public async Task Get_Properties_Should_Return_Ok_And_Contain_Data()
    {
        var response = await _client.GetAsync("/properties");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));

        var properties = await response.Content.ReadFromJsonAsync<List<PropertyListItemDto>>();

        Assert.That(properties, Is.Not.Null);
        Assert.That(properties!.Count, Is.GreaterThanOrEqualTo(2));
        Assert.That(properties.Any(p => p.Name == "Rivage Bal Harbour"), Is.True);
    }

    [Test]
    public async Task Get_Property_By_Id_Should_Return_Ok_And_Contain_Data()
    {
        var response = await _client.GetAsync("/properties");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));

        var properties = await response.Content.ReadFromJsonAsync<List<PropertyListItemDto>>();

        Assert.That(properties!.Count, Is.GreaterThanOrEqualTo(2));

        var firstProperty = properties.First(p => p.Id is not null);
        var propertyIdToTest = firstProperty.Id;

        var singleResponse = await _client.GetAsync($"/properties/{propertyIdToTest}");
        
        singleResponse.EnsureSuccessStatusCode();
        Assert.That(singleResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK));

        var retrievedProperty = await singleResponse.Content.ReadFromJsonAsync<PropertyDetailsDto>();
        
        Assert.That(retrievedProperty, Is.Not.Null);
        Assert.That(retrievedProperty!.Id, Is.EqualTo(propertyIdToTest));
        Assert.That(retrievedProperty.Name, Is.EqualTo(firstProperty.Name));
    }
}