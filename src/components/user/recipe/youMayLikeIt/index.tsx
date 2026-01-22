import React from "react";
import { RecipeCard } from "@/components/common/recipeCard";
export default function YouMayLikeIt() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">You May Also Like</h3>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5].map((ele) => (
          <RecipeCard key={ele}></RecipeCard>
        ))}
      </div>
    </div>
  );
}
