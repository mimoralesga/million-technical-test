using SimpleApiBackend.Application.Interfaces;

namespace SimpleApiBackend.Application.Features;

public class GetPropertyDetailsHandler
{
    private readonly IPropertyRepository _propertyRepository;
    private readonly IOwnerRepository _ownerRepository; 

    public GetPropertyDetailsHandler(IPropertyRepository propertyRepository, IOwnerRepository ownerRepository)
    {
        _propertyRepository = propertyRepository;
        _ownerRepository = ownerRepository;
    }

    public async Task<PropertyDetailsDto?> Handle(string propertyId)
    {
        var property = await _propertyRepository.GetPropertyByIdAsync(propertyId);
        if (property == null)
        {
            return null;
        }

        var owner = await _ownerRepository.GetOwnerByIdAsync(property.OwnerId.ToString());
        
        if (owner == null)
        {
            return null; 
        }

        
        var ownerDto = new OwnerInfoDto(
            owner.Id.ToString(),
            owner.Name,
            owner.Address,
            owner.Photo,
            owner.Birthday
        );
        
        var image = property.Images
            .Select(i => new ImageDto(i.FileUrl, i.Enabled))
            .ToList()
            .FirstOrDefault();
            
        var trace = property.Trace
            .Select(t => new TraceDto(t.DateSale, t.Name, t.Value, t.Tax))
            .ToList();

        return new PropertyDetailsDto(
            property.Id.ToString(),
            property.Name,
            property.Address,
            property.Price,
            property.Year,
            property.CodeInternal,
            ownerDto,
            image,
            trace
        );
    }
}