"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { adminLogout } from "@/actions/auth/admin.action";
import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between p-3 border-b">
      <h2 className="font-semibold">RedOtter Admin Dashboard</h2>
      <div className="flex gap-2 items-center">
        <Link href="/" target="__blank">
          <Button
            size="sm"
            variant="outline"
            className="border-black text-black hover:text-white hover:bg-black"
          >
            Back to Site
          </Button>
        </Link>
        <Button
          size={"sm"}
          variant={"outline"}
          className="border-red-600 text-red-600 hover:text-white hover:bg-red-600"
          onClick={() => adminLogout()}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
