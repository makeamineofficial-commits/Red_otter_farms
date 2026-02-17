import AccountBreadcrumb from "@/components/account/breadcrumb";
import OtterWallet from "@/components/account/wallet";
import React from "react";

export default function page() {
  return (
    <>
      <div>
        <AccountBreadcrumb>Otter Wallet</AccountBreadcrumb>
        <h1 className="text-[1.4rem] font-bold">Otter Wallet</h1>
        <p className="text-muted-foreground">
          Your farming journey at a glance
        </p>
      </div>
      <OtterWallet></OtterWallet>
    </>
  );
}
