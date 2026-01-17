import React, { ReactNode } from "react";
import { ProductStore } from "@/store/admin/product.store";
export default function layout({ children }: { children: ReactNode }) {
  return <ProductStore>{children}</ProductStore>;
}
