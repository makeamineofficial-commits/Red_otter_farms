"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

type BaseProps = {
  title: string;
  subtitle?: string;
  options: string[];
  allowCustom?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  isSubmit?: boolean;
  nextTitle?: string;
  backTitle?: string;
};

export type MultiSelectProps = BaseProps & {
  value: string[];
  onChange: (value: string[]) => void;
};

export type SingleSelectProps = BaseProps & {
  value: string | null;
  onChange: (value: string) => void;
};

/* ---------------- MULTI ---------------- */

export function MultiSelectQuestion({
  title,
  subtitle,
  options,
  value,
  onChange,
  onBack,
  onNext,
  allowCustom,
  ...rest
}: MultiSelectProps) {
  const [showCustom, setShowCustom] = React.useState(false);
  const [customValue, setCustomValue] = React.useState("");

  /* Detect existing custom value (from localStorage / back nav) */
  const existingCustom = React.useMemo(
    () => value.find((v) => !options.includes(v)),
    [value, options],
  );

  React.useEffect(() => {
    if (existingCustom) {
      setCustomValue(existingCustom);
      setShowCustom(true);
    }
  }, [existingCustom]);

  /* Toggle predefined option */
  const toggle = (opt: string) => {
    onChange(
      value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt],
    );
  };

  /* Confirm custom value */
  const confirmCustom = () => {
    if (!customValue.trim()) return;

    const cleaned = value.filter((v) => options.includes(v));
    onChange([...cleaned, customValue.trim()]);
    setShowCustom(false);
  };

  /* Remove custom value */
  const removeCustom = () => {
    onChange(value.filter((v) => options.includes(v)));
    setCustomValue("");
    setShowCustom(false);
  };

  /* Validation */
  const isValid = value.length > 0;

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <Title title={title} subtitle={subtitle} />

          <div className="grid grid-cols-1 [@media(width>=450px)]:grid-cols-2 md:grid-cols-3 gap-3">
            {options.map((opt) => (
              <OptionButton
                key={opt}
                label={opt}
                active={value.includes(opt)}
                onClick={() => toggle(opt)}
              />
            ))}

            {/* OTHER BUTTON */}
            {allowCustom && (
              <OptionButton
                label="Other"
                active={!!existingCustom || showCustom}
                onClick={() => setShowCustom(true)}
                icon={<Plus size={14} />}
              />
            )}
          </div>

          {/* CUSTOM INPUT */}
          {allowCustom && showCustom && (
            <div className="mt-4 flex items-center gap-2">
              <input
                className="flex-1 rounded-md border px-3 py-2 text-sm"
                placeholder="Please specify..."
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
              />
              <Button
                size="icon"
                className="bg-maroon!"
                onClick={confirmCustom}
                disabled={!customValue.trim()}
              >
                <Check size={16} />
              </Button>
              {existingCustom && (
                <Button size="icon" variant="ghost" onClick={removeCustom}>
                  ✕
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Footer
        onBack={onBack}
        onNext={onNext}
        disableNext={!isValid}
        {...rest}
      />
    </div>
  );
}
/* ---------------- SINGLE ---------------- */
export function SingleSelectQuestion({
  title,
  subtitle,
  options,
  value,
  onChange,
  onBack,
  onNext,
  allowCustom,
  ...rest
}: SingleSelectProps) {
  const [customValue, setCustomValue] = React.useState("");

  const isOtherSelected = value === "Other";

  const isValid =
    value !== null && (!isOtherSelected || customValue.trim().length > 0);

  const handleNext = () => {
    if (isOtherSelected) {
      onChange(customValue.trim());
    }
    onNext?.();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <Title title={title} subtitle={subtitle} />

          <div className="grid grid-cols-1 [@media(width>=450px)]:grid-cols-2 md:grid-cols-3 gap-3">
            {options.map((opt) => (
              <OptionButton
                key={opt}
                label={opt}
                active={value === opt}
                onClick={() => onChange(opt)}
              />
            ))}
          </div>

          {allowCustom && isOtherSelected && (
            <input
              className="mt-4 w-full rounded-md border px-3 py-2 text-sm"
              placeholder="Please specify..."
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
            />
          )}
        </CardContent>
      </Card>

      <Footer
        onBack={onBack}
        onNext={handleNext}
        {...rest}
        disableNext={!isValid}
      />
    </div>
  );
}

/* ---------------- SHARED ---------------- */

function Title({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
function OptionButton({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border px-4 py-3 text-sm transition text-left min-w-44",
        active
          ? "border-maroon bg-maroon/5 text-maroon"
          : "hover:border-muted-foreground/40",
      )}
    >
      <div className="flex items-center gap-2">
        <span>{label}</span>
        {icon}
        {active && !icon && <Check size={14} />}
      </div>
    </button>
  );
}
function Footer({
  onBack,
  onNext,
  isSubmit,
  backTitle = "Back",
  nextTitle = "Next",
  disableNext,
}: {
  onBack?: () => void;
  onNext?: () => void;
  isSubmit?: boolean;
  nextTitle?: string;
  backTitle?: string;
  disableNext?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mt-6">
      <Button variant="ghost" onClick={onBack} disabled={!onBack}>
        <ChevronLeft className="h-4 w-4" /> {backTitle}
      </Button>

      <Button
        className="bg-maroon!"
        type={isSubmit ? "submit" : "button"}
        onClick={() => {
          if (!isSubmit && onNext) {
            onNext();
          }
        }}
        disabled={disableNext}
      >
        {nextTitle} <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
