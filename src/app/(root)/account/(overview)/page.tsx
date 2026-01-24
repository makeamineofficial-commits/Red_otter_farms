import React from "react";
import Progress from "@/components/account/overview/profile";
import Balance from "@/components/account/overview/balance";
import Delivery from "@/components/account/overview/delivery";
import KPI from "@/components/account/overview/kpi";
import Nutrition from "@/components/account/overview/nutrition";
import Order from "@/components/account/overview/orders";
import AccountBreadcrumb from "@/components/account/breadcrumb";
export default function page() {
  return (
    <>
      <div>
        <AccountBreadcrumb></AccountBreadcrumb>
        <h1 className="text-[1.4rem] font-bold">Account Overview</h1>
        <p className="text-muted-foreground">
          Your farming journey at a glance
        </p>
      </div>
      <Progress></Progress>

      <div className="flex gap-4 md:flex-row flex-col">
        <Balance></Balance>
        <Delivery></Delivery>
      </div>

      <KPI></KPI>

      <Nutrition></Nutrition>
      <Order></Order>
    </>
  );
}
