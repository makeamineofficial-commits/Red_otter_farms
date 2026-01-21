"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function ArrayField({ value = [], onChange }: Props) {
  const addField = () => {
    onChange([...value, ""]);
  };

  const updateField = (idx: number, newValue: string) => {
    const updated = [...value];
    updated[idx] = newValue;
    onChange(updated);
  };

  const removeField = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      {value.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className="opacity-60 font-bold">–</span>

          <Textarea
            value={item}
            placeholder={`Item ${idx + 1}`}
            onChange={(e) => updateField(idx, e.target.value)}
            className="flex-1 h-2"
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeField(idx)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addField}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add
      </Button>
    </div>
  );
}
