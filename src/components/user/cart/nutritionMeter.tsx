"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger2,
  AccordionTrigger3,
} from "@/components/ui/accordion";
import { ChevronUp, Flame, Beef, Wheat, Droplets, X } from "lucide-react";
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
export function NutritionSummaryRow() {
  const { cart } = useCart();

  function parseNutrition(value?: string) {
    if (!value) return { amount: 0, unit: "" };
    const match = value.match(/([\d.]+)\s*([a-zA-Z]+)/);
    if (!match) return { amount: 0, unit: "" };
    return {
      amount: parseFloat(match[1]),
      unit: match[2].trim().toLowerCase(),
    };
  }

  function convertUnit(amount: number, unit: string) {
    if (unit === "mg") return { amount: amount / 1000, unit: "g" };
    return { amount, unit };
  }

  let totalCalories = 0;
  let totalProtein = 0;

  cart?.items.forEach((item) => {
    const info = item.product.nutritionalInfo;
    if (!info) return;

    Object.entries(info).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();

      const parsed = parseNutrition(value as string);
      const converted = convertUnit(parsed.amount, parsed.unit);

      if (lowerKey.includes("calorie") || lowerKey.includes("energy")) {
        totalCalories += converted.amount * item.quantity;
      }

      if (lowerKey.includes("protein")) {
        totalProtein += converted.amount * item.quantity;
      }
    });
  });

  if (!totalCalories && !totalProtein) return null;

  return (
    <div className="flex items-center justify-between px-4 gap-4 py-2 rounded-xl">
      {/* Energy */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <Flame className="h-4 w-4 text-orange-500" />
        <span>{Math.round(totalCalories)} kcal</span>
      </div>

      {/* Protein */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <Beef className="h-4 w-4 text-rose-500" />
        <span>{totalProtein.toFixed(1)} g</span>
      </div>
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
  const { cart } = useCart();

  // Normalize nutrient keys to avoid duplicates
  function normalizeKey(key: string) {
    key = key.toLowerCase().replace(/\s|_/g, "");
    const map: Record<string, string> = {
      carbs: "carbohydrates",
      carbohydrate: "carbohydrates",
      protein: "protein",
      fat: "fat",
      fiber: "fiber",
      sodium: "sodium",
      potassium: "potassium",
      calories: "calories",
      sugar: "sugar",
    };
    return map[key] || key;
  }

  // Parse string like "100mg", "2 g", "0.5g", "176 kcal"
  function parseNutrition(value?: string) {
    if (!value) return { amount: 0, unit: "" };
    const match = value.match(/([\d.]+)\s*([a-zA-Z]+)/);
    if (!match) return { amount: 0, unit: "" };
    return {
      amount: parseFloat(match[1]),
      unit: match[2].trim().toLowerCase(),
    };
  }

  // Convert mg → g automatically for consistency
  function convertUnit(amount: number, unit: string) {
    if (unit === "mg") return { amount: amount / 1000, unit: "g" };
    return { amount, unit };
  }

  function formatLabel(key: string) {
    return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }

  function formatAmount(value: number) {
    if (value >= 100) return Math.round(value).toString();
    if (value >= 10) return value.toFixed(1);
    return value.toFixed(2);
  }

  const totals = cart?.items.reduce(
    (acc, item) => {
      const info = item.product.nutritionalInfo;
      if (!info) return acc;

      Object.entries(info).forEach(([key, value]) => {
        const parsed = parseNutrition(value as string);
        if (parsed.amount === 0) return;

        const normalizedKey = normalizeKey(key);
        const converted = convertUnit(parsed.amount, parsed.unit);

        if (!acc[normalizedKey]) {
          acc[normalizedKey] = {
            amount: 0,
            unit: converted.unit,
            originalKey: normalizedKey,
          };
        }

        // Sum amounts
        acc[normalizedKey].amount += converted.amount * item.quantity;
      });

      return acc;
    },
    {} as Record<string, { amount: number; unit: string; originalKey: string }>,
  );

  const entries = Object.values(totals || {});

  if (entries.length === 0) {
    return (
      <div className="my-2 text-muted-foreground text-sm text-center uppercase">
        No Information
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((data) => (
        <NutritionRow
          key={data.originalKey}
          label={formatLabel(data.originalKey)}
          value={`${formatAmount(data.amount)} ${data.unit}`}
        />
      ))}
    </div>
  );
}

type NutritionMeterDrawerProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function NutritionMeterDrawer({
  isOpen,
  setIsOpen,
}: NutritionMeterDrawerProps) {
  const { isLoading } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-50"
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-60
          bg-background rounded-t-2xl w-full
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2 font-semibold text-base">
            <Flame className="h-5 w-5" />
            <span>Nutrition Meter</span>
          </div>

          <button onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pb-14 pt-4 max-h-[70vh] overflow-y-auto">
          {isLoading ? <NutritionSkeleton /> : <NutritionContent />}
        </div>
      </div>
    </>
  );
}

export function NutritionMeterAccordion() {
  const { isLoading } = useCart(); // assuming nutrition depends on cart

  return (
    <div className="">
      <Accordion type="single" defaultValue="nutrition" collapsible>
        <AccordionItem
          value="nutrition"
          className="border-t bg-background rounded-t-2xl "
        >
          {/* Trigger */}
          <AccordionTrigger3
            className="
              flex items-center justify-between
              px-5 py-4 text-base font-semibold
            "
          >
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 " />
              <span>Nutrition Meter</span>
            </div>
          </AccordionTrigger3>

          {/* Content */}
          <AccordionContent className="px-5 pb-5">
            {isLoading ? <NutritionSkeleton /> : <NutritionContent />}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
