import { QueryProvider } from "@/provider/query.provider";
import { AccountStore } from "@/store/user/account.store";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <QueryProvider>
        <AccountStore>{children}</AccountStore>
      </QueryProvider>
    </>
  );
}
