"use client";


import { Product } from "@/types/product";
import UpdateProductForm from "./form";

export function UpdateProduct({ product }: { product: Product }) {
  return <UpdateProductForm product={product} />;
}
