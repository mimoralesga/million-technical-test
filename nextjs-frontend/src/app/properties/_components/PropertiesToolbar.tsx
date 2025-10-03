"use client";

import { Search } from "lucide-react";
import { parseAsString, useQueryState, debounce } from "nuqs";
import FilterButton from "@/components/FilterButton";
import { Input } from "@/components/ui/input";

export default function PropertiesToolbar() {
  const [name, setName] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );

  const handleSearch = (value: string) => {
    if (value === "") {
      setName(null);
    } else {
      setName(value, {
        limitUrlUpdates: value === "" ? undefined : debounce(500),
      });
    }
  };

  return (
    <div className="flex items-center gap-2 mb-4">
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
  );
}
