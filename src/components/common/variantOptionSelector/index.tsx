"use client";

import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { ProductOption, VariantOption } from "@/types/product";

interface Props {
  value: VariantOption[];
  onChange: (val: VariantOption[]) => void;

  options: ProductOption[];
}

export function VariantOptionSelector({ value, onChange, options }: Props) {
  useEffect(() => {
    if (!options?.length) return;

    if (value?.length) return;

    const defaults = options.map((opt) => {
      const def = opt.values.find((v) => v.isDefault);

      return {
        option: opt.slug,
        optionValue: def?.slug || "",
      };
    });

    onChange(defaults);
  }, [options]);

  const handleChange = (optionSlug: string, valueSlug: string) => {
    const updated = [...(value || [])];

    const index = updated.findIndex((v) => v.option === optionSlug);

    if (index >= 0) {
      updated[index].optionValue = valueSlug;
    } else {
      updated.push({
        option: optionSlug,
        optionValue: valueSlug,
      });
    }

    onChange(updated);
  };

  const getValue = (slug: string) => {
    return value?.find((v) => v.option === slug)?.optionValue || "";
  };

  return (
    <div className="space-y-4 grid grid-cols-2 gap-4 mt-4">
      {options.map((opt) => (
        <div key={opt.slug} className="space-y-1 w-full">
          <Label>{opt.displayName}</Label>

          <Select
            value={getValue(opt.slug)}
            onValueChange={(val) => handleChange(opt.slug, val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>

            <SelectContent className="w-full">
              {opt.values.map((val) => (
                <SelectItem key={val.slug} value={val.slug}>
                  {val.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
