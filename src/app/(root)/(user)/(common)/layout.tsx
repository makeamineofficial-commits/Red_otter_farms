import React, { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/user/header";
import Newsletter from "@/components/user/newsletter";
import Footer from "@/components/user/footer";
import { CartProvider } from "@/provider/cart.provider";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <body className="relative max-w-500 mx-auto">
      <CartProvider>
        <Header></Header>
        {children}

        <Newsletter></Newsletter>
        <Footer></Footer>

        <Toaster></Toaster>
      </CartProvider>
    </body>
  );
}
