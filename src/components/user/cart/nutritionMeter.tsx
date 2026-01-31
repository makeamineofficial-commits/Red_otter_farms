"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger2,
} from "@/components/ui/accordion";
import { ChevronUp, Flame, Beef, Wheat, Droplets } from "lucide-react";
import { useCart } from "@/provider/cart.provider";

function NutritionSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between items-center">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}

function NutritionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span>{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function NutritionContent() {
  function parseNutrition(value?: string) {
    if (!value) return { amount: 0, unit: "" };

    const match = value.match(/([\d.]+)\s*(\D+)/);

    if (!match) return { amount: 0, unit: "" };

    return {
      amount: parseFloat(match[1]),
      unit: match[2].trim(),
    };
  }
  function formatLabel(key: string) {
    return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }

  function formatAmount(value: number) {
    if (value >= 100) return Math.round(value).toString();
    if (value >= 10) return value.toFixed(1);
    return value.toFixed(2);
  }

  const { cart } = useCart();

  const totals = cart?.products.reduce(
    (acc, product) => {
      const info = product.nutritionalInfo;
      if (!info) return acc;

      Object.entries(info).forEach(([key, value]) => {
        //   @ts-ignore
        const parsed = parseNutrition(value);

        if (!acc[key]) {
          acc[key] = { amount: 0, unit: parsed.unit };
        }

        acc[key].amount += parsed.amount * product.quantity;
        acc[key].unit ||= parsed.unit;
      });

      return acc;
    },
    {} as Record<string, { amount: number; unit: string }>,
  );

  if (!totals) return null;

  return (
    <div className="space-y-4">
      {Object.entries(totals).length === 0 ? (
        <>
          <div className="my-2 text-muted-foreground text-sm text-center uppercase">
            No Information
          </div>
        </>
      ) : (
        <>
          {Object.entries(totals).map(([key, data]) => (
            <NutritionRow
              key={key}
              label={formatLabel(key)}
              value={`${formatAmount(data.amount)} ${data.unit}`}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default function NutritionMeter() {
  const { isLoading } = useCart(); // assuming nutrition depends on cart

  return (
    <div className="">
      <Accordion type="single" defaultValue="nutrition" collapsible>
        <AccordionItem
          value="nutrition"
          className="border-t bg-background rounded-t-2xl "
        >
          {/* Trigger */}
          <AccordionTrigger2
            className="
              flex items-center justify-between
              px-5 py-4 text-base font-semibold
              [&[data-state=open]>svg]:rotate-180
            "
          >
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 " />
              <span>Nutrition Meter</span>
            </div>

            <ChevronUp className="h-5 w-5 transition-transform duration-200" />
          </AccordionTrigger2>

          {/* Content */}
          <AccordionContent className="px-5 pb-5">
            {isLoading ? <NutritionSkeleton /> : <NutritionContent />}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
