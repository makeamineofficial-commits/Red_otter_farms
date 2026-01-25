import { Header } from "@/components/user/recipe/header";
import React, { ReactNode } from "react";
import { RecipeListingStore } from "@/store/user/recipes.store";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className="pt-45 flex gap-5 flex-col relative">
      <RecipeListingStore>{children}</RecipeListingStore>
    </main>
  );
}
