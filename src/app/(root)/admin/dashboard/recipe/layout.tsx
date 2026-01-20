import React, { ReactNode } from "react";
import { RecipeStore } from "@/store/admin/recipe.store";
export default function layout({ children }: { children: ReactNode }) {
  return <RecipeStore>{children}</RecipeStore>;
}
