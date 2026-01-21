import React, { ReactNode } from "react";
import Banner from "@/components/user/collections/banner";
import Filter from "@/components/user/collections/filter";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="pt-45 px-4 md:px-12 lg:px-18 pb-5">
        <Banner></Banner>

        <article className="flex my-5 gap-2 lg:gap-10 lg:flex-row flex-col lg:items-start items-end">
          <Filter></Filter>

          {children}
        </article>
      </main>
    </>
  );
}
