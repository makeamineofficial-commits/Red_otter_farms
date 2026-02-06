import React, { ReactNode } from "react";
import { VariantStore } from "@/store/admin/variant.store";
export default function layout({ children }: { children: ReactNode }) {
  return <VariantStore>{children}</VariantStore>;
}
