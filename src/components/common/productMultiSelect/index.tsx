"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type ProductOption = {
  label: string;
  value: string;
};

export type SelectedProduct = {
  publicId: string;
  quantity: number;
};

type Props = {
  value: SelectedProduct[];
  onChange: (value: SelectedProduct[]) => void;
  options: ProductOption[];
  loading?: boolean;
  placeholder?: string;
};

export function ProductMultiSelect({
  value,
  onChange,
  options,
  loading,
  placeholder = "Select products...",
}: Props) {
  const isSelected = (id: string) => value.some((v) => v.publicId === id);

  const toggleProduct = (id: string) => {
    if (isSelected(id)) {
      onChange(value.filter((v) => v.publicId !== id));
    } else {
      onChange([...value, { publicId: id, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, qty: number) => {
    onChange(
      value.map((v) => (v.publicId === id ? { ...v, quantity: qty } : v)),
    );
  };

  const removeProduct = (id: string) => {
    onChange(value.filter((v) => v.publicId !== id));
  };

  const selectedLabels = value
    .map((v) => options.find((o) => o.value === v.publicId)?.label)
    .filter(Boolean)
    .join(", ");

  React.useEffect(() => {
    const normalized = value.map((v) => ({
      publicId: v.publicId,
      quantity:
        typeof v.quantity === "number" && v.quantity > 0 ? v.quantity : 1,
    }));

    if (JSON.stringify(normalized) !== JSON.stringify(value)) {
      onChange(normalized);
    }
  }, [value, onChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          <span className="truncate text-left">
            {value.length ? selectedLabels : placeholder}
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-(--radix-popover-trigger-width) max-h-64 overflow-auto p-0">
        <Command>
          <CommandInput placeholder="Search products..." />

          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <>
              <CommandEmpty>No products found.</CommandEmpty>

              <CommandGroup>
                {options.map((opt) => {
                  const selected = value.find((v) => v.publicId === opt.value);

                  return (
                    <CommandItem
                      key={opt.value}
                      className="flex items-center justify-between gap-2"
                      onSelect={() => toggleProduct(opt.value)}
                    >
                      <div className="flex items-center gap-2">
                        <Check
                          className={cn(
                            "h-4 w-4",
                            selected ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <span>{opt.label}</span>
                      </div>

                      {selected && (
                        <div
                          className="flex items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Input
                            className="h-8 w-16"
                            value={selected.quantity}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === "") {
                                updateQuantity(opt.value, 1);
                                return;
                              }
                              if (/^\d+$/.test(val)) {
                                updateQuantity(opt.value, Number(val));
                              }
                            }}
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeProduct(opt.value)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
