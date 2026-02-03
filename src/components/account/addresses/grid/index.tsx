"use client";

import React from "react";
import AddressCard from "../card";
import AddressForm from "../create";
import { useAddressStore } from "@/store/user/address.store";
import AddressCardLoader from "../card/loader";
import { useAccountStore } from "@/store/user/account.store";
export default function AddressGrid() {
  const { data, isLoading, isFetching } = useAddressStore();
  const {
    data: user,
    isLoading: isUserLoading,
    isFetching: isFetchingUser,
  } = useAccountStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
      <AddressForm></AddressForm>

      {isLoading || isFetching || !user || isUserLoading || isFetchingUser ? (
        <>
          {Array.from([1, 2, 3, 4]).map((ele) => (
            <AddressCardLoader key={ele}></AddressCardLoader>
          ))}
        </>
      ) : (
        <>
          {data?.addresses.map((ele) => (
            <AddressCard
              key={ele.address_id}
              name={user.first_name + " " + user.last_name}
              {...ele}
            ></AddressCard>
          ))}
        </>
      )}
    </div>
  );
}
