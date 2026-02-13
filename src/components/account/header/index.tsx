"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Menu } from "lucide-react";
import { useMenu } from "@/provider/menu.provider";
import Link from "next/link";
export default function Header() {
  const { toggle } = useMenu();
  return (
    <header className="flex items-center justify-between px-2 py-4 md:p-4 border-b">
      <div className="flex justify-center items-center gap-2 md:gap-6">
        <Link href="/">
          <ChevronLeft></ChevronLeft>
        </Link>
        <div>
          <h2 className="font-bold text-[1.125rem] leading-none">
            Customer Hub
          </h2>
          <p className="text-[0.875rem] tracking-[0%] text-muted-foreground">
            Welcome back, Farmer!
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <button onClick={() => toggle()} className="block md:hidden">
          <Menu size={20}></Menu>
        </button>

        <div className="h-8 w-8 bg-muted-foreground/20 rounded-full"></div>
      </div>
    </header>
  );
}
