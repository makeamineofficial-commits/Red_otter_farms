"use client";
import React, { createContext, useContext, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/actions/user/orders/list.action";
import { ProductPreview } from "@/types/product";
interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: (SalesOrder & { products: ProductPreview[] })[] | undefined;
  error: Error | null;
  refetch: () => Promise<any>;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { isFetching, isError, isLoading, data, error, refetch } = useQuery<
    (SalesOrder & { products: ProductPreview[] })[] | undefined
  >({
    queryKey: ["order-history"],
    queryFn: async () => {
      const res = await fetch("/api/v1/user/orders");
      return await res.json();
    },

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <StoreContext.Provider
      value={{ isLoading, isError, isFetching, data, error, refetch }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const OrderStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <StoreContent>{children}</StoreContent>
    </Suspense>
  );
};

export const useOrderStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useOrderStore must be used inside OrderStore");
  return ctx;
};
