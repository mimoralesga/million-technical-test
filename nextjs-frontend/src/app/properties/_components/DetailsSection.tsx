import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DetailsSection() {
  return (
    <section className="bg-background rounded shadow-xs border p-4 flex flex-col gap-4">
      <span className="font-medium">Details</span>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input placeholder="Name" />
        </div>
        <div>
          <Label>Address</Label>
          <Input placeholder="Address" />
        </div>
        <div>
          <Label>Price</Label>
          <Input placeholder="Price" />
        </div>
        <div>
          <Label>Code Internal</Label>
          <Input placeholder="Code" />
        </div>
        <div>
          <Label>Year</Label>
          <Input placeholder="Year" />
        </div>
      </div>
    </section>
  );
}
