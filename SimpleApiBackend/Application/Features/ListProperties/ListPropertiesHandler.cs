using SimpleApiBackend.Application.Interfaces;

namespace SimpleApiBackend.Application.Features.ListProperties;

public class ListPropertiesHandler(IPropertyRepository propertyRepository)
{
    private readonly IPropertyRepository _propertyRepository = propertyRepository;

    public async Task<IReadOnlyList<PropertyListItemDto>> Handle(PropertyFilterQuery query)
    {
        var properties = await _propertyRepository.ListPropertiesAsync(query.Q, query.Min, query.Max);

        var dtoList = properties
            .Select(p => new PropertyListItemDto(
                p.Id.ToString(),
                p.Name,
                p.Address,
                p.Price,
                p.CodeInternal,
                p.Images.FirstOrDefault()
            ))
            .ToList();

        return dtoList;
    }
}