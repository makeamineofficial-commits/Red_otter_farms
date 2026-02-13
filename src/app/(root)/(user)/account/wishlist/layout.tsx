import React, { ReactNode } from "react";
import { WishlistStore } from "@/store/user/wishlist.store";
export default function layout({ children }: { children: ReactNode }) {
  return <WishlistStore>{children}</WishlistStore>;
}
