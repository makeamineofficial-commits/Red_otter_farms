import React, { ReactNode } from "react";
import { OrderStore } from "@/store/user/order.store";
export default function layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
