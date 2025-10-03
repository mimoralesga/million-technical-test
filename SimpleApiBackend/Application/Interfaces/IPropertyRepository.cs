using SimpleApiBackend.Domain.Entities;

namespace SimpleApiBackend.Application.Interfaces;

public interface IPropertyRepository
{
    Task<List<Property>> ListPropertiesAsync();
    Task<Property?> GetPropertyByIdAsync(string Id);
}