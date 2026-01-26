"use client";
import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { getAccount } from "@/actions/user/account/get.action";
import { Account } from "@/types/account";
interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: Account | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { isFetching, isError, isLoading, data, error } = useQuery<
    Account | undefined
  >({
    queryKey: ["account"],
    queryFn: async () => {
      const data = await getAccount();
      return data.account;
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

export const AccountStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <StoreContent>{children}</StoreContent>
    </Suspense>
  );
};

export const useAccountStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useAccountStore must be used inside AccountStore");
  return ctx;
};
