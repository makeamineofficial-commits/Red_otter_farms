import { Header } from "@/components/user/recipe/header";
import React, { ReactNode } from "react";
import { RecipeListingStore } from "@/store/user/recipes.store";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <RecipeListingStore>
      <section className="px-4 md:px-12 lg:px-18 pb-5 flex flex-col gap-5 mt-5">
        {children}
      </section>
    </RecipeListingStore>
  );
}
