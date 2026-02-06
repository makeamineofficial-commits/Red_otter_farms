"use client";

import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { listVariants } from "@/actions/admin/variants/list.action";
import { PaginatedResponse } from "@/types/common";
import { Variant } from "@/types/product";
interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: PaginatedResponse<Variant> | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const { publicId } = useParams();
  const filter = useMemo(() => {
    return {
      productId: publicId?.toString() || "",
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "10"),
      q: searchParams.get("q") || undefined,
      showPublishedOnly:
        searchParams.get("showPublishedOnly") === "true" || false,
    };
  }, [searchParams, publicId]);

  const { isFetching, isError, isLoading, data, error } = useQuery<
    PaginatedResponse<Variant> | undefined
  >({
    queryKey: ["variants", filter],
    queryFn: async () => {
      const res = await listVariants(filter);

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

export const VariantStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <StoreContent>{children}</StoreContent>
    </Suspense>
  );
};

export const useVariantStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useVariantStore must be used inside VariantStore");
  return ctx;
};
