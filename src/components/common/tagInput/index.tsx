"use client";

import * as React from "react";
import { X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  value?: string[];
  options?: string[]; // 👈 predefined options
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export function TagInput({
  value = [],
  options = [],
  onChange,
  placeholder = "Type or select",
}: Props) {
  const [input, setInput] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  /* Close dropdown on outside click */
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const addTag = (tag: string) => {
    const v = tag.trim();
    if (!v || value.includes(v)) return;

    onChange([...value, v]);
    setInput("");
    setOpen(false);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  /* Filter options */
  const filteredOptions = options.filter(
    (opt) =>
      opt.toLowerCase().includes(input.toLowerCase()) && !value.includes(opt),
  );

  return (
    <div ref={ref} className="relative space-y-2">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 rounded-md border p-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-red-500"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        {/* Input */}
        <div className="flex-1 min-w-[120px] flex items-center gap-1">
          <Input
            value={input}
            placeholder={placeholder}
            className="border-0 focus-visible:ring-0 shadow-none"
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              setInput(e.target.value);
              setOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(input);
              }
            }}
          />

          <button
            type="button"
            onClick={() => setOpen((p) => !p)}
            className="text-muted-foreground"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {open && (filteredOptions.length > 0 || input) && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-md max-h-48 overflow-auto">
          {/* Options */}
          {filteredOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => addTag(opt)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-muted"
            >
              {opt}
            </button>
          ))}

          {/* Create New */}
          {input && !options.includes(input) && !value.includes(input) && (
            <button
              type="button"
              onClick={() => addTag(input)}
              className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-muted border-t"
            >
              ➕ Add "{input}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}
