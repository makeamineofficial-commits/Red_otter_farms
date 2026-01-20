import React from "react";
import CreateRecipe from "@/components/admin/recipe/create";
import { Search } from "@/components/common/search";
import { RecipeTable } from "@/components/admin/recipe/table";
export default function page() {
  return (
    <>
      <h2 className="font-semibold">Recipes</h2>
      <div className="flex items-center justify-between">
        <Search></Search>
        <CreateRecipe></CreateRecipe>
      </div>
      <RecipeTable></RecipeTable>
    </>
  );
}
