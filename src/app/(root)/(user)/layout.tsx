import { QueryProvider } from "@/provider/query.provider";
import { AccountStore } from "@/store/user/account.store";
export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AccountStore>{children}</AccountStore>
    </>
  );
}
