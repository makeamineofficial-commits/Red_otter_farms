"use client";
import { ProductCardLoader } from "@/components/common/productCard/loading";
import { useSimilarStore } from "@/store/user/similar-product.store";
import { ProductCard } from "@/components/common/productCard/card";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export default function Similar() {
  const { isLoading, isFetching, products } = useSimilarStore();

  if (isLoading || !products || isFetching)
    return (
      <section className="space-y-5">
        <h2 className="font-bold text-[1.25rem]">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {Array.from([1, 2, 3])?.map((product) => (
            <ProductCardLoader key={product}></ProductCardLoader>
          ))}
        </div>
      </section>
    );

  return (
    <section className="space-y-5">
      <h2 className="font-bold text-[1.25rem]">You may also like</h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center my-10 text-gray-foreground">
          No products found.
        </div>
      )}
    </section>
  );
}
