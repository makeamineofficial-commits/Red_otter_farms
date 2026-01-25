"use client";
import React from "react";
import { RecipeCard } from "@/components/common/recipeCard";
import { RecipeCardLoader } from "@/components/common/recipeCard/loading";
import { useRecipeListingStore } from "@/store/user/recipes.store";

export default function YouMayLikeIt() {
  const { data, isLoading, isFetching } = useRecipeListingStore();
  if (!data || isFetching || isLoading)
    return (
      <>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">You May Also Like</h3>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5].map((recipe) => (
              //  @ts-ignore
              <RecipeCardLoader key={recipe.title} />
            ))}
          </div>
        </div>
      </>
    );
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">You May Also Like</h3>
      <article className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {data.data.slice(0, 4).map((recipe) => (
          //  @ts-ignore
          <RecipeCard key={recipe.title} {...recipe} />
        ))}
      </article>
    </div>
  );
}
