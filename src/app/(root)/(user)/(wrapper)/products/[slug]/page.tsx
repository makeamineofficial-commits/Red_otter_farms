import React from "react";
import Images from "@/components/user/products/images";
import Hero from "@/components/user/products/hero";
import Similar from "@/components/user/products/similar";
import { ProductProvider } from "@/provider/product.provider";
import ProductBreadcrumb from "@/components/user/products/breadcrumb";
export default function page() {
  return (
    <>
      <ProductProvider>
        <ProductBreadcrumb></ProductBreadcrumb>
        <section className="flex gap-12 items-start justify-center  flex-col lg:flex-row ">
          <Images></Images>
          <Hero></Hero>
        </section>
        <Similar></Similar>
      </ProductProvider>
    </>
  );
}
