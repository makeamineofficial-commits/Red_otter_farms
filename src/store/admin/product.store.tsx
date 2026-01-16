"use client";

import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";
import { listProduct } from "@/actions/admin/products/list.action";
import { PaginatedResponse } from "@/types/common";
import { Product } from "@/types/product";
interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: PaginatedResponse<Product> | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const filter = useMemo(() => {
    return {
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "10"),
      q: searchParams.get("q") || undefined,
      showPublishedOnly:
        searchParams.get("showPublishedOnly") === "true" || false,
    };
  }, [searchParams]);

  const { isFetching, isError, isLoading, data, error } = useQuery<
    PaginatedResponse<Product> | undefined
  >({
    queryKey: ["Products", filter],
    queryFn: async () => {
      const res = await listProduct(filter);

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

export const ProductStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <StoreContent>{children}</StoreContent>
    </Suspense>
  );
};

export const useProductStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useProductStore must be used inside ProductStore");
  return ctx;
};
