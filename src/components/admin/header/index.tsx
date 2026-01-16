"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { adminLogout } from "@/actions/auth/admin.action";
export default function Header() {
  return (
    <header className="flex items-center justify-between p-3 border-b">
      <h2 className="font-semibold">RedOtter Admin Dashboard</h2>

      <Button
        variant={"outline"}
        className="border-red-600 text-red-600 hover:text-white hover:bg-red-600"
        onClick={() => adminLogout()}
      >
        Logout
      </Button>
    </header>
  );
}
