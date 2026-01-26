import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Salad, CheckCircle2 } from "lucide-react";
import { Recipe } from "@/types/recipe";
export default function Ingredients({ ingredients }: Recipe) {
  return (
    <div className="space-y-6  bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold">Ingredients</h2>

      <ul className="space-y-2 text-sm">
        {ingredients.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <CheckCircle2 className="size-4 text-forest mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
