"use client";
import React from "react";
import { useProductDetailsStore } from "@/store/admin/productDetail.store";
import UpdateProductForm from "@/components/admin/product/update/form";
export default function page() {
  const { data, isFetching, isLoading } = useProductDetailsStore();

  if (!data || isFetching || isLoading) return <>Loading</>;
  return (
    <>
      <UpdateProductForm product={data}></UpdateProductForm>
    </>
  );
}
