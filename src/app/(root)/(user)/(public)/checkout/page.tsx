import React from "react";
import Shipping from "@/components/user/checkout/shipping";
import Summary from "@/components/user/checkout/summary";
import Billing from "@/components/user/checkout/billing";
import Payment from "@/components/user/checkout/payment";
import Pay from "@/components/user/checkout/pay";
export default function page() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4   px-4 md:px-12 lg:px-18 pb-5 mt-5">
      <article className=" col-span-1 lg:col-span-2 flex flex-col gap-4">
        <Billing></Billing>
        <Shipping></Shipping>
      </article>
      <article className="col-span-1 flex flex-col gap-4 lg:sticky lg:top-50 h-fit">
        <Summary></Summary>
        <Payment></Payment>
        <Pay></Pay>
      </article>
    </section>
  );
}
