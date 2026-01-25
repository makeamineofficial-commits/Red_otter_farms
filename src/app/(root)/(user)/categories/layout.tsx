import React, { ReactNode } from "react";
import Banner from "@/components/user/categories/banner";
import Filter from "@/components/user/categories/filter";
import { ProductListingStore } from "@/store/user/products.store";
import CategoryBreadcrumb from "@/components/user/categories/breadcrumb";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProductListingStore>
        <main className="pt-45 px-4 md:px-12 lg:px-18 pb-5">
          <Banner></Banner>

          <article className="flex my-5 gap-2 lg:gap-10 lg:flex-row flex-col lg:items-start items-end">
            <Filter></Filter>

            <div className="w-full">
              <CategoryBreadcrumb></CategoryBreadcrumb>
              {children}
            </div>
          </article>
        </main>
      </ProductListingStore>
    </>
  );
}
