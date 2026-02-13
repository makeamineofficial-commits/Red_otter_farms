import { AccountStore } from "@/store/user/account.store";
import { ReactNode } from "react";
import { CartProvider } from "@/provider/cart.provider";
import { OrderStore } from "@/store/user/order.store";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <AccountStore>
      <OrderStore>
        <CartProvider>{children}</CartProvider>
      </OrderStore>
    </AccountStore>
  );
}
