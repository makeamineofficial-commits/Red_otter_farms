import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header></Header>

      <main className="flex flex-1  overflow-hidden">
        <Sidebar></Sidebar>
        <section className="border-l p-4 flex flex-col gap-4 overflow-auto flex-1 h-full ">
          {children}
        </section>
      </main>
    </>
  );
}
