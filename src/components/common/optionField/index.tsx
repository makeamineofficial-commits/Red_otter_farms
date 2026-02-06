"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash } from "lucide-react";
import { FieldErrors } from "react-hook-form";

interface OptionValue {
  displayName: string;
  isDefault?: boolean;
}

interface Option {
  displayName: string;
  values: OptionValue[];
}

interface Props {
  value: Option[];
  onChange: (value: Option[]) => void;
  errors?: FieldErrors<Option[]>;
}

export function OptionsField({ value = [], onChange, errors }: Props) {
  /* ---------------- Error Helpers ---------------- */

  const getOptionError = (optionIndex: number, valueIndex?: number) => {
    if (!errors) return undefined;

    // @ts-ignore
    const optErr = errors?.[optionIndex];

    if (!optErr) return undefined;

    /* ---------------- Option Name Error ---------------- */
    if (valueIndex === undefined) {
      if (optErr?.displayName?.message) {
        return optErr.displayName.message;
      }

      // ✅ Handle array-level "values" error
      if (optErr?.values?.message) {
        return optErr.values.message;
      }

      return undefined;
    }

    /* ---------------- Value Error ---------------- */
    if (optErr?.values?.[valueIndex]?.displayName?.message) {
      return optErr.values[valueIndex].displayName.message;
    }

    return undefined;
  };

  /* ---------------- State Helpers ---------------- */

  const updateOptions = (options: Option[]) => {
    onChange([...options]);
  };

  const addOption = () => {
    updateOptions([
      ...value,
      {
        displayName: "",
        values: [{ displayName: "", isDefault: true }],
      },
    ]);
  };

  const removeOption = (index: number) => {
    const next = [...value];
    next.splice(index, 1);
    updateOptions(next);
  };

  const updateOptionName = (index: number, name: string) => {
    const next = [...value];
    next[index].displayName = name;
    updateOptions(next);
  };

  const addValue = (optionIndex: number) => {
    const next = [...value];

    next[optionIndex].values.push({
      displayName: "",
      isDefault: false,
    });

    updateOptions(next);
  };

  const removeValue = (optionIndex: number, valueIndex: number) => {
    const next = [...value];

    const values = next[optionIndex].values;

    const wasDefault = values[valueIndex]?.isDefault;

    values.splice(valueIndex, 1);

    // Keep one default
    if (wasDefault && values.length > 0) {
      values[0].isDefault = true;
    }

    updateOptions(next);
  };

  const updateValueName = (
    optionIndex: number,
    valueIndex: number,
    name: string,
  ) => {
    const next = [...value];

    next[optionIndex].values[valueIndex].displayName = name;

    updateOptions(next);
  };

  const setDefault = (optionIndex: number, valueIndex: number) => {
    const next = [...value];

    next[optionIndex].values = next[optionIndex].values.map((v, i) => ({
      ...v,
      isDefault: i === valueIndex,
    }));

    updateOptions(next);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Options</h4>

        <Button type="button" size="sm" variant="outline" onClick={addOption}>
          <Plus className="h-4 w-4 mr-1" />
          Add Option
        </Button>
      </div>

      {/* Options */}
      {value.map((option, optionIndex) => {
        const optionError = getOptionError(optionIndex);

        return (
          <Card key={optionIndex} className="p-4 space-y-3">
            {/* ---------------- Option Name ---------------- */}
            <div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Option name (Size, Color...)"
                  value={option.displayName}
                  onChange={(e) =>
                    updateOptionName(optionIndex, e.target.value)
                  }
                  className={
                    optionError
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeOption(optionIndex)}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              {/* Option Error */}
              {optionError && (
                <p className="text-sm text-red-500 mt-1">{optionError}</p>
              )}
            </div>

            {/* ---------------- Values ---------------- */}
            <div className="space-y-2 pl-2">
              <RadioGroup
                value={String(option.values.findIndex((v) => v.isDefault))}
                onValueChange={(val) => setDefault(optionIndex, Number(val))}
              >
                {option.values.map((val, valueIndex) => {
                  const valueError = getOptionError(optionIndex, valueIndex);

                  return (
                    <div key={valueIndex}>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={String(valueIndex)} />

                        <Input
                          placeholder="Value (Small, Red...)"
                          value={val.displayName}
                          onChange={(e) =>
                            updateValueName(
                              optionIndex,
                              valueIndex,
                              e.target.value,
                            )
                          }
                          className={
                            valueError
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                          }
                        />

                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => removeValue(optionIndex, valueIndex)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Value Error */}
                      {valueError && (
                        <p className="text-sm text-red-500 mt-1">
                          {valueError}
                        </p>
                      )}
                    </div>
                  );
                })}
              </RadioGroup>
            </div>

            {/* Add Value */}
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => addValue(optionIndex)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Value
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
