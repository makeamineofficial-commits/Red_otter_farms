import React, { ReactNode } from "react";
import { ProductDetailsStore } from "@/store/admin/productDetail.store";
export default function layout({ children }: { children: ReactNode }) {
  return <ProductDetailsStore>{children}</ProductDetailsStore>;
}
