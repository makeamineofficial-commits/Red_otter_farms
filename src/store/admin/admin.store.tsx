"use client";
import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCollection } from "@/actions/admin/collections/getAll.action";
interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data:
    | {
        collections: { publicId: string; name: string }[];
      }
    | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { isFetching, isError, isLoading, data, error } = useQuery<
    | {
        collections: { publicId: string; name: string }[];
      }
    | undefined
  >({
    queryKey: ["admin"],
    queryFn: async () => {
      const collections = await getAllCollection();
      return { collections };
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

export const AdminStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <StoreContent>{children}</StoreContent>
    </Suspense>
  );
};

export const useAdminStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useAdminStore must be used inside AdminStore");
  return ctx;
};
