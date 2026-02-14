"use client";

import React, { createContext, Suspense, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSimilarProducts } from "@/actions/user/products/similar.action";

interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  products: any[];
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

export const Store = ({ children }: { children: React.ReactNode }) => {
  const { slug } = useParams();

  const { data, isFetching, isError, isLoading, error } = useQuery({
    queryKey: ["similar-products", slug],
    enabled: !!slug,
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("slug", slug?.toString() ?? "");
      const url = `/api/v1/user/products/similar?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch recipes");
      }
      return await res.json();
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <StoreContext.Provider
      value={{
        isLoading,
        isError,
        isFetching,
        products: data ?? [],
        error: error as Error | null,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const SimilarStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <Store>{children}</Store>
    </Suspense>
  );
};

export const useSimilarStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useSimilarStore must be used inside SimilarStore");
  }
  return ctx;
};
