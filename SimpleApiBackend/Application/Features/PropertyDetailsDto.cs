namespace SimpleApiBackend.Application.Features;

public record PropertyDetailsDto(
    string Id,
    string Name,
    string Address,
    int Price,
    int Year,
    string CodeInternal,
    
    OwnerInfoDto OwnerDetails, 

    IReadOnlyList<ImageDto> Images,
    IReadOnlyList<TraceDto> Traces
);

public record OwnerInfoDto(
    string Id,
    string Name,
    string Address,
    string Photo
);

public record ImageDto(
    string FileUrl,
    bool IsActive
);

public record TraceDto(
    DateTime SaleDate,
    string Name,
    int Value,
    int Tax
);