namespace SimpleApiBackend.Infrastructure.Features;

public record PropertyListItemDto(
    string Id,
    string Name,
    string Address,
    int Price,
    string CodeInternal
);