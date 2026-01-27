import React, { ReactNode } from "react";
import { CheckoutProvider } from "@/provider/checkout.provider";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CheckoutProvider>{children}</CheckoutProvider>
    </>
  );
}
