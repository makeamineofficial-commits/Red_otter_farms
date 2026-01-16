import React from "react";
import CreateProduct from "@/components/admin/product/create";
import { Search } from "@/components/common/search";
import { ProductTable } from "@/components/admin/product/table";
export default function page() {
  return (
    <>
      <h2 className="font-semibold">Products</h2>
      <div className="flex items-center justify-between">
        <Search></Search>
        <CreateProduct></CreateProduct>
      </div>
      <ProductTable></ProductTable>
    </>
  );
}
