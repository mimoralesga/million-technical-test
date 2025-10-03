using SimpleApiBackend.Domain.Entities;

namespace SimpleApiBackend.Application.Interfaces;

public interface IOwnerRepository
{
    Task<Owner?> GetOwnerByIdAsync(string Id);
}