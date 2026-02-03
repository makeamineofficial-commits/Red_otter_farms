"use client";

import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";
import { PaginatedResponse } from "@/types/common";
import { Testimonial } from "@/types/testimonial";
import { listTestimonials } from "@/actions/admin/testimonial/list.action";

interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: PaginatedResponse<Testimonial> | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const filter = useMemo(() => {
    return {
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "10"),
      q: searchParams.get("q") || undefined,
      showPublishedOnly:
        searchParams.get("showPublishedOnly") === "true" || false,
    };
  }, [searchParams]);

  const { isFetching, isError, isLoading, data, error } = useQuery<
    PaginatedResponse<Testimonial> | undefined
  >({
    queryKey: ["testimonials", filter],
    queryFn: async () => {
      const res = await listTestimonials(filter);

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

export const TestimonialStore = ({
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

export const useTestimonialStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error("useTestimonialStore must be used inside TestimonialStore");
  return ctx;
};
