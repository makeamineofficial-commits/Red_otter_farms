"use client";
import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/actions/user/products/get.action";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";

interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: (Product & { recipes: { title: string; slug: string }[] }) | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { slug } = useParams();
  const { isFetching, isError, isLoading, data, error } = useQuery<
    (Product & { recipes: { title: string; slug: string }[] }) | undefined
  >({
    queryKey: ["product", slug],
    queryFn: async () => {
      if (!slug) return;
      const product = await getProduct({
        slug: slug?.toString(),
      });
      console.log(product.product);
      return product.product;
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
