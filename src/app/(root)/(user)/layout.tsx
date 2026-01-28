import React, { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/user/header";
import Newsletter from "@/components/user/newsletter";
import Footer from "@/components/user/footer";
import { CartProvider } from "@/provider/cart.provider";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <body className="relative max-w-500 mx-auto">
        <Header></Header>
        {children}
        {/* <div className="pt-40"></div> */}
        <Newsletter></Newsletter>
        <Footer></Footer>

        <Toaster></Toaster>
      </body>
    </CartProvider>
  );
}
