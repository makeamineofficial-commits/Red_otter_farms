"use client";
import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVariant } from "@/actions/admin/variants/get.action";
import { Variant } from "@/types/product";
import { useParams } from "next/navigation";
interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: Variant | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { variantPublicId } = useParams();
  const { isFetching, isError, isLoading, data, error } = useQuery<
    Variant | undefined
  >({
    queryKey: ["variant", variantPublicId],
    queryFn: async () => {
      if (!variantPublicId) return;
      const res = await getVariant({
        publicId: variantPublicId.toString(),
      });
      return res.variant;
    },
    enabled: !!variantPublicId,
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

export const VariantDetailsStore = ({
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

export const useVariantDetailsStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error(
      "useVariantDetailsStore must be used inside VariantDetailsStore",
    );
  return ctx;
};
