import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";
import { AdminStore } from "@/store/admin/admin.store";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminStore>
        <main className="flex flex-1 overflow-hidden h-full  flex-col ">
          <Header></Header>
          <section className="flex overflow-hidden h-full">
            <Sidebar></Sidebar>
            <div className=" p-4 flex flex-col gap-4  flex-1 h-full overflow-auto">
              {children}
            </div>
          </section>
          {/*
           */}
        </main>
      </AdminStore>
    </>
  );
}
