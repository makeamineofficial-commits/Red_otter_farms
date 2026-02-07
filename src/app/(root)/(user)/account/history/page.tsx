import AccountBreadcrumb from "@/components/account/breadcrumb";
import React from "react";
import Order from "@/components/account/orders";
export default function page() {
  return (
    <>
      <div>
        <AccountBreadcrumb>Order History</AccountBreadcrumb>
        <h1 className="text-[1.4rem] font-bold">Order History</h1>
        <p className="text-muted-foreground">
          Your farming journey at a glance
        </p>
      </div>
      <Order></Order>
    </>
  );
}
