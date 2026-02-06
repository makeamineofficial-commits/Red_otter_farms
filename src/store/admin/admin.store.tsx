"use client";
import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllVariants } from "@/actions/admin/variants/getAll.action";
import { getAllCategory } from "@/actions/admin/category/getAll.action";

interface ContextDataReturnType {
  categories: { publicId: string; name: string }[];
  variants: {
    publicId: string;
    name: string;
    options: string[];
  }[];
}

interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: ContextDataReturnType | undefined;

  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { isFetching, isError, isLoading, data, error } = useQuery<
    ContextDataReturnType | undefined
  >({
    queryKey: ["admin"],
    queryFn: async () => {
      const categories = await getAllCategory();
      const variants = await getAllVariants();
      return { categories, variants };
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
