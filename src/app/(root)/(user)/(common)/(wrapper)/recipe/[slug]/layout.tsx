import React, { ReactNode } from "react";
import { SimilarRecipeStore } from "@/store/user/similar-recipe.store";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <SimilarRecipeStore>{children}</SimilarRecipeStore>
  );
}
