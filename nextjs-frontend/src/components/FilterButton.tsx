"use client";

import { useState } from "react";
import { FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SliderWithOutput from "./SliderWithOutput";
import { parseAsInteger, useQueryState } from "nuqs";

export default function FilterButton() {
  const [min, setMin] = useQueryState(
    "min",
    parseAsInteger.withDefault(0).withOptions({ shallow: false }),
  );
  const [max, setMax] = useQueryState(
    "max",
    parseAsInteger.withDefault(1000000).withOptions({ shallow: false }),
  );
  const [value, setValue] = useState([min, max]);
  const [open, setOpen] = useState(false);

  const handleChange = (value: number[]) => {
    setValue(value);
  };

  const handleApply = () => {
    setMin(value[0]);
    setMax(value[1]);
    setOpen(false);
  };

  const handleClear = () => {
    setMin(null);
    setMax(null);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            aria-label="Filters"
            className="h-7 px-2 text-muted-foreground"
            onClick={() => setOpen(true)}
          >
            <FilterIcon size={12} aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="space-y-3">
            <div className="text-muted-foreground text-xs font-medium">
              Filters
            </div>
            <form>
              <div className="space-y-3">
                <SliderWithOutput
                  defaultValue={value}
                  onChange={handleChange}
                />
              </div>
              <div
                role="separator"
                aria-orientation="horizontal"
                className="bg-border -mx-3 my-3 h-px"
              ></div>
              <div className="flex justify-between gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2"
                  onClick={handleClear}
                  type="button"
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  className="h-7 px-2"
                  onClick={handleApply}
                  type="button"
                >
                  Apply
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
