import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="pt-45 px-4 md:px-12 lg:px-18 pb-5 max-w-400 m-auto space-y-10">
        {children}
      </main>
    </>
  );
}
