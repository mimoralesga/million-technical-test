import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OwnerSection() {
  return (
    <section className="bg-background rounded shadow-xs border p-4 flex flex-col gap-4">
      <span className="font-medium">Owner</span>
      <div>
        <Label>Name</Label>
        <Input placeholder="Name" />
      </div>
      <div>
        <Label>Address</Label>
        <Input placeholder="Address" />
      </div>
      <div>
        <Label>Birthday</Label>
        <Input placeholder="Birthday" />
      </div>
    </section>
  );
}
