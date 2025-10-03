import DetailsItem from "./DetailsItem";

export default function OwnerSection({ owner }: { owner: any }) {
  return (
    <section className="bg-background rounded shadow-xs border p-4 flex flex-col gap-4">
      <span className="font-medium">Owner</span>
      <DetailsItem label="Name" value="" />
      <DetailsItem label="Address" value="" />
      <DetailsItem label="Birthday" value="" />
    </section>
  );
}
