using SimpleApiBackend.Domain.Entities;

namespace SimpleApiBackend.Application.Interfaces;

public interface IPropertyRepository
{
    Task<List<Property>> ListPropertiesAsync(string? q, int? min, int? max);
    Task<Property?> GetPropertyByIdAsync(string Id);
}