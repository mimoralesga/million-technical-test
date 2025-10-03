namespace SimpleApiBackend.Application.Features.ListProperties;

public record PropertyFilterQuery(
    string? Q,
    int? Min,
    int? Max
);