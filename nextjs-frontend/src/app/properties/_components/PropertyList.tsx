import { Property } from "@/types/property";
import PropertyItem from "./PropertyItem";

export default async function PropertyList({
  properties,
}: {
  properties: Property[];
}) {
  return properties.length > 0 ? (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyItem key={property.id} property={property} />
      ))}
    </div>
  ) : (
    <div className="h-35 flex w-full border border-dashed p-4 items-center justify-center text-sm">
      No properties found
    </div>
  );
}
