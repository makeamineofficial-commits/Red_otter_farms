import { Separator } from "@/components/ui/separator";
import { Recipe } from "@/types/recipe";
import React from "react";
export default function NutritionFacts({ nutritionalInfo }: Recipe) {
  return (
    <div className="space-y-6  bg-white p-6 rounded-2xl shadow-lg">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Nutrition Facts</h2>
        <p className="text-xs text-muted-foreground">Per Serving</p>
      </div>
      <div className="space-y-2 text-sm">
        {Object.entries(nutritionalInfo).map(([label, value]) => (
          <React.Fragment key={label}>
            <div className="flex justify-between">
              <span className="text-muted-foreground capitalize">{label}</span>
              <span className="font-medium">{nutritionalInfo[label]}</span>
            </div>
            <Separator></Separator>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
