import React from "react";
import ComparisonTable from "./table";

export default function Compare() {
  return (
    <section className="bg-mint flex flex-col items-center gap-4 sm:gap-10 lg:gap-18 px-4 md:px-12 lg:px-18 py-10 sm:py-16 lg:py-24">
      <h2 className="font-dream-orphans text-forest text-[2rem] lg:text-[3.5rem] 2xl:text-[4.75rem] font-light uppercase">
        <span className="text-red-500!">Red otter </span>
        vs Others
      </h2>
      <ComparisonTable></ComparisonTable>
    </section>
  );
}
