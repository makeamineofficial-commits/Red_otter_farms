import React from "react";
import Shipping from "@/components/user/checkout/shipping";
import Summary from "@/components/user/checkout/summary";
import Billing from "@/components/user/checkout/billing";
import Payment from "@/components/user/checkout/payment";

export default function page() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4   px-4 md:px-12 lg:px-18 pb-5 ">
      <article className=" col-span-1 lg:col-span-2 flex flex-col gap-4">
        <Billing></Billing>
        <Shipping></Shipping>
      </article>
      <article className="col-span-1 flex flex-col gap-4">
        <Summary></Summary>
        <Payment></Payment>
      </article>
    </section>
  );
}
