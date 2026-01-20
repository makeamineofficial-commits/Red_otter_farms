import React, { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <body className="flex h-screen overflow-hidden flex-col">
      {children}
      <Toaster></Toaster>
    </body>
  );
}
