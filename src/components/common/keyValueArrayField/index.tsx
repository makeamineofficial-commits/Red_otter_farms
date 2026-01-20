"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { generateSlug } from "@/lib/utils";

type Props = {
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
};

export function KeyValueArrayField({ value, onChange }: Props) {
  const [preview, setPreview] = useState<{ key: string; val: string }[]>([
    { key: "random_key", val: "0" },
  ]);
  // initial update
  useEffect(() => {
    if (!value) return;

    setPreview(
      Object.keys(value).map((key) => {
        return { key, val: value[key] };
      }),
    );
  }, []);
  const addField = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const newKey = `random_${randomNumber}`;

    setPreview((prev) => [...prev, { key: newKey, val: "0" }]);

    onChange({
      ...value,
      [newKey]: "0",
    });
  };

  const updateKey = (idx: number, newKey: string) => {
    const oldKey = preview[idx].key;
    if (oldKey === newKey) return;

    setPreview((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, key: newKey } : item)),
    );

    const { [oldKey]: oldVal, ...rest } = value;
    onChange({
      ...rest,
      [newKey]: oldVal,
    });
  };

  const updateValue = (idx: number, newValue: string) => {
    const key = preview[idx].key;

    setPreview((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, val: newValue } : item)),
    );

    onChange({
      ...value,
      [key]: newValue,
    });
  };

  const removeField = (idx: number) => {
    const key = preview[idx].key;

    setPreview((prev) => prev.filter((_, i) => i !== idx));

    const { [key]: _, ...rest } = value;
    onChange(rest);
  };

  return (
    <div className="space-y-3">
      {Object.values(preview).map((ele, idx) => {
        return (
          <>
            <div key={idx} className="flex gap-2 items-center ml-4">
              {/* slug preview */}
              <div className="font-black flex items-center justify-center opacity-70  h-9">
                -
              </div>

              <Input
                value={ele.key}
                onChange={(e) => updateKey(idx, e.target.value)}
                placeholder="Key"
                className="flex-1 w-96"
              />

              <Input
                className="flex-1 w-96"
                value={ele.val}
                onChange={(e) => updateValue(idx, e.target.value)}
                placeholder="Value"
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
          </>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addField}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" /> Add
      </Button>
    </div>
  );
}
