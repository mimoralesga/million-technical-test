import { Label } from "@/components/ui/label";

export default function DetailsItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col">
      <Label>{label}</Label>
      <span>{value}</span>
    </div>
  );
}
