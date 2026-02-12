import { AccountStore } from "@/store/user/account.store";
import { ReactNode } from "react";
import LocationPicker from "@/components/user/location";
export default function layout({ children }: { children: ReactNode }) {
  return <AccountStore>{children}</AccountStore>;
}
