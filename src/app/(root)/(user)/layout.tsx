import { AccountStore } from "@/store/user/account.store";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <AccountStore>{children}</AccountStore>;
}
