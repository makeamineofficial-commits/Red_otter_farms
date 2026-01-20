import React, { ReactNode } from "react";
import { CategoryStore } from "@/store/admin/category.store";
export default function layout({ children }: { children: ReactNode }) {
  return <CategoryStore>{children}</CategoryStore>;
}
