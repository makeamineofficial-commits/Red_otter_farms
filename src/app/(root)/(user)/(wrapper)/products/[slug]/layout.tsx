import React, { ReactNode } from "react";
import { SimilarStore } from "@/store/user/similar-product.store";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <>

      <SimilarStore>
        <main className="px-4 md:px-12 lg:px-18 pb-5 max-w-400 m-auto space-y-10">
          {children}
        </main>
      </SimilarStore>

    </>
  );
}
