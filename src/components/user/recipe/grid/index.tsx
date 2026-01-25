"use client";
import { RecipeCard } from "@/components/common/recipeCard";
import { useRecipeListingStore } from "@/store/user/recipes.store";
import { RecipeCardLoader } from "@/components/common/recipeCard/loading";
export function Grid() {
  const { data, isLoading, isFetching } = useRecipeListingStore();
  if (!data || isFetching || isLoading)
    return (
      <>
        <article className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5].map((recipe) => (
            //  @ts-ignore
            <RecipeCardLoader key={recipe.title} />
          ))}
        </article>
      </>
    );
  return (
    <article className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {data.data.map((recipe) => (
        //  @ts-ignore
        <RecipeCard key={recipe.title} {...recipe} />
      ))}
    </article>
  );
}
