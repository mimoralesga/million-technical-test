import { Property } from "@/services/properties.service";
import PropertyItem from "./PropertyItem";

export default function PropertyList({
  properties,
}: {
  properties: Property[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyItem
          key={property.id}
          id={property.id}
          name={property.name}
          address={property.address}
          image={null}
          price={property.price}
        />
      ))}
    </div>
  );
}
