import { AccountStore } from "@/store/user/account.store";
import { ReactNode } from "react";
import { CartProvider } from "@/provider/cart.provider";
import { OrderStore } from "@/store/user/order.store";
import { AddressStore } from "@/store/user/address.store";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AccountStore>
        <AddressStore>
          <CartProvider>{children}</CartProvider>
        </AddressStore>
      </AccountStore>
    </>
  );
}
