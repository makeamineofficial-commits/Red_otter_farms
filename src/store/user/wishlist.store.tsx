"use client";
import React, { createContext, useContext, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/actions/user/orders/list.action";
import { ProductPreview } from "@/types/product";
import { getWishlist } from "@/actions/user/products/wishlist.action";
interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: ProductPreview[] | undefined;
  error: Error | null;
  refetch: () => Promise<any>;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { isFetching, isError, isLoading, data, error, refetch } = useQuery<
    ProductPreview[] | undefined
  >({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const data = await getWishlist();
      return data.products;
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

export const WishlistStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <StoreContent>{children}</StoreContent>
    </Suspense>
  );
};

export const useWishlistStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error("useWishlistStore must be used inside WishlistStore");
  return ctx;
};
