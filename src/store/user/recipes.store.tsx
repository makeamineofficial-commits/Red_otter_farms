"use client";

import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

import { useParams, useSearchParams } from "next/navigation";
import { listProducts } from "@/actions/user/products/list.action";
import { PaginatedResponse } from "@/types/common";
import { Product, SortBy } from "@/types/product";
import { Recipe, RecipePreview } from "@/types/recipe";
import { listRecipes } from "@/actions/user/recipes/list.action";

interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: PaginatedResponse<RecipePreview> | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const { category } = useParams();

  const filter = useMemo(() => {
    return {
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "10"),
      q: searchParams.get("q") || undefined,
      category:
        category && category.toString() !== "all"
          ? category.toString()
          : undefined,
    };
  }, [searchParams, category]);

  const { isFetching, isError, isLoading, data, error } = useQuery<
    PaginatedResponse<RecipePreview> | undefined
  >({
    queryKey: ["recipes", filter],
    queryFn: async () => {
      const res = await listRecipes(filter);

      return res;
    },
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

export const RecipeListingStore = ({
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

export const useRecipeListingStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error(
      "useRecipeListingStore must be used inside RecipeListingStore",
    );
  return ctx;
};
