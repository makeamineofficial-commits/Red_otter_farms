"use client";
import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "@/actions/user/recipes/get.action";
import { Recipe } from "@/types/recipe";
import { useParams } from "next/navigation";

interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: Recipe | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { slug } = useParams();
  const { isFetching, isError, isLoading, data, error } = useQuery<
    Recipe | undefined
  >({
    queryKey: ["product", slug],
    queryFn: async () => {
      if (!slug) return;
      const data = await getRecipe({
        slug: slug?.toString(),
      });
      console.log(data.recipe);
      return data.recipe;
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

export const RecipeStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <StoreContent>{children}</StoreContent>
    </Suspense>
  );
};

export const useRecipeStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useRecipeStore must be used inside RecipeStore");
  return ctx;
};
