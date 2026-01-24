import React from "react";
import AccountBreadcrumb from "@/components/account/breadcrumb";
import AddressForm from "@/components/account/addresses/create";
import AddressCard from "@/components/account/addresses/card";
export default function page() {
  return (
    <>
      <div>
        <AccountBreadcrumb>Addresses</AccountBreadcrumb>
        <h1 className="text-[1.4rem] font-bold">Your Addresses</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
        <AddressForm></AddressForm>
        <AddressCard></AddressCard>
        <AddressCard></AddressCard>
        <AddressCard></AddressCard>
        <AddressCard></AddressCard>
        <AddressCard></AddressCard>
        <AddressCard></AddressCard>
        <AddressCard></AddressCard>
      </div>
    </>
  );
}
