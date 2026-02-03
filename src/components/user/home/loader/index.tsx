"use client";

import { cn } from "@/lib/utils";
import { useHomeStore } from "@/store/user/home.store";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CurtainLoader() {
  const { isLoading, isFetching } = useHomeStore();
  const loading = isLoading || isFetching;

  const [showCurtain, setShowCurtain] = useState(true);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setShowLogo(false), 300);
      setTimeout(() => setShowCurtain(false), 800);
    }
  }, [loading]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Logo */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Image
          src="/logo-black.webp"
          alt="Logo"
          width={300}
          height={300}
          className={cn(
            "transition-opacity duration-500",
            showLogo ? "opacity-100" : "opacity-0",
          )}
          priority
        />
      </div>

      {/* Top curtain */}
      <div
        className={cn(
          "absolute top-0 left-0 h-1/2 w-full bg-background transition-transform duration-700 ease-in-out",
          showCurtain ? "translate-y-0" : "-translate-y-full",
        )}
      />

      {/* Bottom curtain */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1/2 w-full bg-background transition-transform duration-700 ease-in-out",
          showCurtain ? "translate-y-0" : "translate-y-full",
        )}
      />
    </div>
  );
}
