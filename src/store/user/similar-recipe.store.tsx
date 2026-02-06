"use client";
import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "@/actions/user/recipes/get.action";
import { Recipe, RecipePreview } from "@/types/recipe";
import { useParams } from "next/navigation";
import { similarRecipes } from "@/actions/user/recipes/similar.action";

interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: RecipePreview[] | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { slug } = useParams();
  const { isFetching, isError, isLoading, data, error } = useQuery<
    RecipePreview[] | undefined
  >({
    queryKey: ["similar-recipe", slug],
    queryFn: async () => {
      if (!slug) return;
      const data = await similarRecipes(slug?.toString());
      return data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <StoreContext.Provider
      value={{ isLoading, isError, isFetching, data, error }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const SimilarRecipeStore = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Suspense fallback={<></>}>
      <StoreContent>{children}</StoreContent>
    </Suspense>
  );
};

export const useSimilarRecipeStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error(
      "useSimilarRecipeStore must be used inside SimilarRecipeStore",
    );
  return ctx;
};
