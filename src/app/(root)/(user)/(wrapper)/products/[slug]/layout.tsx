import React, { ReactNode } from "react";
import { ProductStore } from "@/store/user/product.store";
import { SimilarStore } from "@/store/user/similar.store";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProductStore>
        <SimilarStore>
          <main className="px-4 md:px-12 lg:px-18 pb-5 max-w-400 m-auto space-y-10">
            {children}
          </main>
        </SimilarStore>
      </ProductStore>
    </>
  );
}
