"use client";

import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

import { useParams, useSearchParams } from "next/navigation";
import { listProducts } from "@/actions/user/products/list.action";
import { PaginatedResponse } from "@/types/common";
import { ProductPreview, SortBy } from "@/types/product";

interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: PaginatedResponse<ProductPreview> | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const { slug } = useParams();

  const filter = useMemo(() => {
    return {
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "10"),
      q: searchParams.get("q") || undefined,
      inStock: searchParams.get("inStock") === "true" || false,
      category: slug ? slug.toString() : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      sortBy: searchParams.get("sortBy") as SortBy,
      benefits: searchParams.getAll("benefit"),
    };
  }, [searchParams, slug]);

  const { isFetching, isError, isLoading, data, error } = useQuery<
    PaginatedResponse<ProductPreview> | undefined
  >({
    queryKey: ["products", JSON.stringify(filter)],
    queryFn: async () => {
      const res = await listProducts(filter);
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

export const ProductListingStore = ({
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

export const useProductListingStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error(
      "useProductListingStore must be used inside ProductListingStore",
    );
  return ctx;
};
