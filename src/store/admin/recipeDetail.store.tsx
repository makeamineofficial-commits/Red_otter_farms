"use client";
import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "@/actions/admin/recipe/get.action";
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
  const { publicId } = useParams();
  const { isFetching, isError, isLoading, data, error } = useQuery<
    Recipe | undefined
  >({
    queryKey: ["recipe", publicId],
    queryFn: async () => {
      if (!publicId) return;
      const res = await getRecipe({
        publicId: publicId?.toString(),
      });
      return res.recipe;
    },
    enabled: !!publicId,
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

export const RecipeDetailsStore = ({
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

export const useRecipeDetailsStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error("useRecipeDetailsStore must be used inside RecipeDetailsStore");
  return ctx;
};
