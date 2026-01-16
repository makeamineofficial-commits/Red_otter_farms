"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export function TagInput({
  value,
  onChange,
  placeholder = "Type and press Enter",
}: Props) {
  const [input, setInput] = React.useState("");

  const addTag = () => {
    const v = input.trim();
    if (!v || value.includes(v)) return;

    onChange([...value, v]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="rounded-md border p-2 space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm"
          >
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      <Input
        value={input}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag();
          }
        }}
      />
    </div>
  );
}
