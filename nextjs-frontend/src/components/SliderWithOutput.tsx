"use client";

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SliderWithOutputProps {
  defaultValue: number[];
  onChange: (value: number[]) => void;
}

export default function SliderWithOutput({
  defaultValue,
  onChange,
}: SliderWithOutputProps) {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (value: number[]) => {
    setValue(value);
    onChange(value);
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex items-center justify-between gap-2">
        <Label className="leading-6 text-xs">Price Range</Label>
        <output className="font-medium tabular-nums">
          ${value[0]} - ${value[1]}
        </output>
      </div>
      <Slider
        value={value}
        onValueChange={handleValueChange}
        min={0}
        max={1000000}
        step={10000}
        aria-label="Price Range"
      />
    </div>
  );
}
