"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";

import FilterButton from "@/components/FilterButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PropertiesToolbar() {
  const [name, setName] = useQueryState("q");

  const handleSearch = (value: string) => {
    if (value === "") {
      setName(null);
    } else {
      setName(value);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Input
            className="peer ps-9 h-7 bg-muted/50 text-sm"
            placeholder="Search for a property"
            value={name ?? ""}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Search aria-hidden="true" className="size-4" />
          </div>
        </div>
        <FilterButton />
      </div>
      <div>
        <Button className="h-7" asChild>
          <Link href="/properties/add">Add a new Property</Link>
        </Button>
      </div>
    </div>
  );
}
