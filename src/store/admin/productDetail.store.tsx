"use client";
import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/actions/admin/products/get.action";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";
interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: Product | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { publicId } = useParams();
  const { isFetching, isError, isLoading, data, error } = useQuery<
    Product | undefined
  >({
    queryKey: ["product", publicId],
    queryFn: async () => {
      if (!publicId) return;
      const product = await getProduct({
        publicId: publicId?.toString(),
      });
      return product.product;
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

export const ProductDetailsStore = ({
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

export const useProductDetailsStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useAdminStore must be used inside AdminStore");
  return ctx;
};
