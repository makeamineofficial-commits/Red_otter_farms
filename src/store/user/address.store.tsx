"use client";
import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { ListAddressReturnType } from "@/types/account";

interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: ListAddressReturnType | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { isFetching, isError, isLoading, data, error } = useQuery<
    ListAddressReturnType | undefined
  >({
    queryKey: ["addresses"],
    queryFn: async () => {
      const res = await fetch("/api/v1/user/address");
      return (await res.json()).data;
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

export const AddressStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <StoreContent>{children}</StoreContent>
    </Suspense>
  );
};

export const useAddressStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useAddressStore must be used inside AddressStore");
  return ctx;
};
