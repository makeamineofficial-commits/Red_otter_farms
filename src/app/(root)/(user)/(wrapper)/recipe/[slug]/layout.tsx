import React, { ReactNode } from "react";
import { RecipeStore } from "@/store/user/recipe.store";
import { SimilarRecipeStore } from "@/store/user/similar-recipe.store";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <RecipeStore>
      <SimilarRecipeStore>{children}</SimilarRecipeStore>
    </RecipeStore>
  );
}
