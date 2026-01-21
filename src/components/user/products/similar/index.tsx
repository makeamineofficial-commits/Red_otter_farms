import React from "react";
import { ProductCard } from "@/components/common/productCard/card";
export default function Similar() {
  return (
    <section className="space-y-5">
      <h2 className="font-bold text-[1.25rem]">You may also like</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </div>
    </section>
  );
}
