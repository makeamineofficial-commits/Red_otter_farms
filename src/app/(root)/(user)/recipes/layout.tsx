import { Header } from "@/components/user/recipe/header";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <main className=" flex gap-5 flex-col relative">{children}</main>;
}
