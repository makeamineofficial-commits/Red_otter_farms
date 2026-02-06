"use client";

import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@/types/testimonial";
import { listTestimonials } from "@/actions/user/testimonial/list.action";
import { listFeaturedProducts } from "@/actions/user/products/featured.action";
import { ProductPreview } from "@/types/product";
interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: { testimonials: Testimonial[]; products: ProductPreview[] } | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { isFetching, isError, isLoading, data, error } = useQuery<
    { testimonials: Testimonial[]; products: ProductPreview[] } | undefined
  >({
    queryKey: ["home"],
    queryFn: async () => {
      const { testimonials } = await listTestimonials();
      const products = await listFeaturedProducts();
      console.log({ testimonials, products });
      return { testimonials, products };
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

export const HomeStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <StoreContent>{children}</StoreContent>
    </Suspense>
  );
};

export const useHomeStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useHomeStore must be used inside HomeStore");
  return ctx;
};
