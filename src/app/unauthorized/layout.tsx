import React, { ReactNode } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <body className="flex h-screen overflow-hidden flex-col">{children}</body>
  );
}
