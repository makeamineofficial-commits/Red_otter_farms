import { ReactNode } from "react";
import { HomeStore } from "@/store/user/home.store";
export default function layout({ children }: { children: ReactNode }) {
  return <HomeStore>{children}</HomeStore>;
}
