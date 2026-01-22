import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Instructions() {
  return (
    <div className="flex flex-col gap-5 ">
      <h2 className="text-xl font-semibold">Instructions</h2>

      <div className="space-y-4 text-sm">
        {[
          "Wash and chop all vegetables thoroughly. Wash and chop all vegetables thoroughly Wash and chop all vegetables thoroughly Wash and chop all vegetables thoroughly",
          "Whisk olive oil, lemon juice, salt and pepper in a bowl.",
          "Combine vegetables in a large mixing bowl.",
          "Pour dressing over salad and toss gently.",
          "Top with feta cheese and serve fresh.",
          "Wash and chop all vegetables thoroughly. Wash and chop all vegetables thoroughly Wash and chop all vegetables thoroughly Wash and chop all vegetables thoroughly",
          "Whisk olive oil, lemon juice, salt and pepper in a bowl.",
        ].map((step, index) => (
          <div key={index} className="flex gap-3 bg-muted/50 p-3  rounded-xl">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white border-2 border-muted-foreground/40  text-xs">
              {index + 1}
            </span>
            <p className="translate-y-2">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
