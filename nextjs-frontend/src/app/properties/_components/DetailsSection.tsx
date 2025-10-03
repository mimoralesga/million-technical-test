import { Property } from "@/types/property";
import DetailsItem from "./DetailsItem";

export default function DetailsSection({ property }: { property: Property }) {
  const formattedPrice = property.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <section className="bg-background rounded shadow-xs border p-4 flex flex-col gap-4">
      <span className="font-medium">Details</span>
      <div className="grid grid-cols-2 gap-4">
        <DetailsItem label="Name" value={property.name} />
        <DetailsItem label="Address" value={property.address} />
        <DetailsItem label="Price" value={formattedPrice} />
        <DetailsItem label="Code Internal" value={property.code} />
        <DetailsItem label="Year" value={String(property.year)} />
      </div>
    </section>
  );
}
