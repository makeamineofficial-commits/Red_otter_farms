"use client";

import React from "react";
import AddressCard from "../card";
import AddressForm from "../create";
import { useAddressStore } from "@/store/user/address.store";
import AddressCardLoader from "../card/loader";

export default function AddressGrid() {
  const { data, isLoading, isFetching } = useAddressStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
      {isLoading || isFetching || !data ? (
        <>
          {Array.from([1, 2, 3, 4]).map((ele) => (
            <AddressCardLoader key={ele}></AddressCardLoader>
          ))}
        </>
      ) : (
        <>
          {data?.addresses?.map((ele) => (
            <AddressCard key={ele.publicId} {...ele}></AddressCard>
          ))}
        </>
      )}
    </div>
  );
}
