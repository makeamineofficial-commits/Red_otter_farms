import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/user/footer";
import Header from "@/components/user/header";
import Newsletter from "@/components/user/newsletter";
import { CartProvider } from "@/provider/cart.provider";
import { QueryProvider } from "@/provider/query.provider";
import { AccountStore } from "@/store/user/account.store";
export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <body className="relative max-w-500 mx-auto">
        <Header></Header>
        {children}

        <Newsletter></Newsletter>
        <Footer></Footer>

        <Toaster></Toaster>
      </body>
    </>
  );
}
