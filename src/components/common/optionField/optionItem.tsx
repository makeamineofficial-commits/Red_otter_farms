"use client";

import { Control, useFieldArray, useWatch } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  control: Control<any>;
  index: number;
  removeOption: (index: number) => void;
}

export function OptionItem({ control, index, removeOption }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `options.${index}.values`,
  });

  const values = useWatch({
    control,
    name: `options.${index}.values`,
  });

  const setDefault = (valueIndex: number) => {
    values?.forEach((_: any, i: number) => {
      control._formValues.options[index].values[i].isDefault = i === valueIndex;
    });
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Option name (eg: Size)"
        {...control.register(`options.${index}.displayName`)}
      />

      <div className="space-y-2">
        {fields.map((field, valueIndex) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              placeholder="Value (eg: 500g)"
              {...control.register(
                `options.${index}.values.${valueIndex}.displayName`,
              )}
            />

            <input
              type="radio"
              name={`default-${index}`}
              checked={values?.[valueIndex]?.isDefault}
              onChange={() => setDefault(valueIndex)}
            />

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => remove(valueIndex)}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          append({
            displayName: "",
            isDefault: fields.length === 0,
          })
        }
      >
        + Add Value
      </Button>

      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={() => removeOption(index)}
      >
        Remove Option
      </Button>
    </div>
  );
}
