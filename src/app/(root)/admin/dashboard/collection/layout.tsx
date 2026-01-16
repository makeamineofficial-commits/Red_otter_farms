import React, { ReactNode } from "react";
import { CollectionStore } from "@/store/admin/collection.store";
export default function layout({ children }: { children: ReactNode }) {
  return <CollectionStore>{children}</CollectionStore>;
}
