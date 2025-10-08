using SimpleApiBackend.Domain.Entities;

namespace SimpleApiBackend.Application.Features.ListProperties;

public record PropertyListItemDto(
    string Id,
    string Name,
    string Address,
    int Price,
    string CodeInternal,
    PropertyImage? Image
);