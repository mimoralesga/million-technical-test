import { PropertyOwner } from "@/types/property-owner";
import DetailsItem from "./DetailsItem";

export default function OwnerSection({ owner }: { owner: PropertyOwner }) {
  return (
    <section className="bg-background rounded shadow-xs border p-4 flex flex-col gap-4">
      <span className="font-medium">Owner</span>
      <DetailsItem label="Name" value={owner.name} />
      <DetailsItem label="Address" value={owner.address} />
      <DetailsItem label="Birthday" value={new Date(owner.birthday).toDateString()} />
    </section>
  );
}
