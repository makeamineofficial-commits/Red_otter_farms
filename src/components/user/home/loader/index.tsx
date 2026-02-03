"use client";

import { cn } from "@/lib/utils";
import { useHomeStore } from "@/store/user/home.store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Sprout } from "lucide-react"; // Optional: adding a small farm icon

export default function CurtainLoader() {
  const { isLoading, isFetching } = useHomeStore();
  const loading = isLoading || isFetching;

  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsExiting(true);
      const timer = setTimeout(() => setIsVisible(false), 1200);
      return () => clearTimeout(timer);
    } else {
      setIsExiting(false);
      setIsVisible(true);
    }
  }, [loading]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Central Content */}
      <div className="relative z-50 flex flex-col items-center gap-4">
        <div
          className={cn(
            "transition-all duration-1000 ease-out",
            loading ? "scale-100 opacity-100" : "scale-150 opacity-0 blur-xl",
          )}
        >
          <Image
            src="/logo-black.webp"
            alt="Farm Logo"
            width={280}
            height={280}
            className="drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]"
            priority
          />
        </div>

        {/* Animated Sprout Loader */}
        <div
          className={cn(
            "transition-opacity duration-500 flex items-center gap-2 text-mint-foreground/60",
            loading ? "opacity-100" : "opacity-0",
          )}
        >
          <Sprout className="w-5 h-5 animate-bounce" />
          <span className="text-sm font-medium tracking-widest uppercase">
            Harvesting...
          </span>
        </div>
      </div>

      {/* Background Panels - Using your "mint" color */}
      <div className="absolute inset-0 flex flex-col md:flex-row">
        {/* Left Panel */}
        <div
          className={cn(
            "h-full w-full bg-mint transition-transform duration-[1000ms] ease-[cubic-bezier(0.77,0,0.175,1)]",
            isExiting ? "-translate-x-full" : "translate-x-0",
          )}
        />
        {/* Right Panel (with a slight delay for organic feel) */}
        <div
          className={cn(
            "h-full w-full bg-mint transition-transform duration-[1000ms] delay-75 ease-[cubic-bezier(0.77,0,0.175,1)] border-l border-white/5",
            isExiting ? "translate-x-full" : "translate-x-0",
          )}
        />
      </div>

      {/* Decorative Organic Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-[url('/grainy-texture.png')] opacity-20 pointer-events-none transition-opacity duration-1000",
          isExiting ? "opacity-0" : "opacity-20",
        )}
      />
    </div>
  );
}
