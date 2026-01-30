"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type SortSelectProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

const OPTIONS = [
  { value: "all", label: "Select" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "latest", label: "Latest" },
];

export function SortSelect({
  value,
  onChange,
  disabled,
  className,
}: SortSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    OPTIONS.find((o) => o.value === value)?.label || "Select";

  return (
    <div
      ref={ref}
      className={`relative w-full sm:w-44 ${className ?? ""} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      {/* Trigger */}
      <button
        type="button"
        className="w-full flex items-center justify-between px-3 py-2 border rounded-md bg-white text-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedLabel}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-50">
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                option.value === value ? "font-semibold bg-gray-50" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
