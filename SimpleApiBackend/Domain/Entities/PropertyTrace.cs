namespace SimpleApiBackend.Domain.Entities;

public class PropertyTrace
{
    public DateTime DateSale { get; set; }
    public required string Name { get; set; }
    public int Value { get; set; }
    public int Tax { get; set; }
}