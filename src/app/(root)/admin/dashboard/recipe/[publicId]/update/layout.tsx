import React, { ReactNode } from "react";
import { RecipeDetailsStore } from "@/store/admin/recipeDetail.store";
export default function layout({ children }: { children: ReactNode }) {
  return <RecipeDetailsStore>{children}</RecipeDetailsStore>;
}
