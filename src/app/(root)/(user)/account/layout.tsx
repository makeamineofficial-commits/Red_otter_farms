import React, { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/account/header";
import Sidebar from "@/components/account/sidebar";
import { MenuProvider } from "@/provider/menu.provider";
import { AccountStore } from "@/store/user/account.store";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <MenuProvider>
      <body className="flex h-screen overflow-hidden flex-col">
        <main className="flex flex-1 overflow-hidden h-full  flex-col ">
          <Header></Header>
          <section className="flex overflow-hidden h-full">
            <Sidebar></Sidebar>
            <article className=" p-3 md:p-5.5 flex flex-col gap-4 md:gap-7.5  flex-1 h-full overflow-y-auto">
              {children}
            </article>
          </section>
        </main>
        <Toaster></Toaster>
      </body>
    </MenuProvider>
  );
}
