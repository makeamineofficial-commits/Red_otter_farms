import { ReactNode } from "react";
import { VariantDetailsStore } from "@/store/admin/variantDetail.store";
export default function layout({ children }: { children: ReactNode }) {
  return <VariantDetailsStore>{children}</VariantDetailsStore>;
}
