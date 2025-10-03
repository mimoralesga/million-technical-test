"use client";

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/utils";
import {
  PRICE_FILTER_MAX,
  PRICE_FILTER_MIN,
  PRICE_FILTER_STEP,
} from "@/lib/constans";

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
          {formatCurrency(value[0])} - {formatCurrency(value[1])}
        </output>
      </div>
      <Slider
        value={value}
        onValueChange={handleValueChange}
        min={PRICE_FILTER_MIN}
        max={PRICE_FILTER_MAX}
        step={PRICE_FILTER_STEP}
        aria-label="Price Range"
      />
    </div>
  );
}
