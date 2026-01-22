import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Salad, CheckCircle2 } from "lucide-react";
export default function Ingredients() {
  return (
    <div className="space-y-6  bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold">Ingredients</h2>

      <ul className="space-y-2 text-sm">
        {[
          "4 cups mixed greens",
          "1 cucumber, diced",
          "1 cup cherry tomatoes",
          "1/4 cup red onion",
          "1/4 cup feta cheese",
          "2 tbsp olive oil",
          "1 tbsp lemon juice",
          "Salt & pepper to taste",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <CheckCircle2 className="size-4 text-emerald-500 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
