"use client";
import { ProductCard } from "../../../common/productCard/card";
import { GridHeader } from "./header";
import { useProductListingStore } from "@/store/user/products.store";
import { ProductCardLoader } from "@/components/common/productCard/loading";
import { Table, TableBody } from "@/components/ui/table";
import { Pagination2 } from "@/components/common/pagination2";
export function Grid() {
  const { data, isLoading, isFetching } = useProductListingStore();
  if (!data || isFetching || isLoading)
    return (
      <>
        <div className="w-full">
          <GridHeader></GridHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5  gap-6">
            {[1, 2, 3, 4, 5].map((ele, i) => (
              <ProductCardLoader key={i} />
            ))}
          </div>
        </div>
      </>
    );
  return (
    <div className="w-full">
      <GridHeader></GridHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5  gap-6">
        {data.data.map((ele, i) => (
          <ProductCard key={i} {...ele} />
        ))}
      </div>

      <Pagination2 colSpan={5} {...data}></Pagination2>
    </div>
  );
}
