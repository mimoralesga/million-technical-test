namespace SimpleApiBackend.Application.Features.ListProperties;

public record PropertyListItemDto(
    string Id,
    string Name,
    string Address,
    int Price,
    string CodeInternal
);