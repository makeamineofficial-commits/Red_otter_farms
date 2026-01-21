import React from "react";
import Images from "@/components/user/products/images";
import Hero from "@/components/user/products/hero";
import Similar from "@/components/user/products/similar";
export default function page() {
  return (
    <>
      <section className="flex gap-12 items-start justify-center  flex-col lg:flex-row ">
        <Images></Images>
        <Hero></Hero>
      </section>
      <Similar></Similar>
    </>
  );
}
