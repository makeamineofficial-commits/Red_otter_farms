"use client";

import { Address, AddressLabels, AddressTag } from "@/types/account";
import UpdateAddressForm from "../update";
import DeleteAddress from "../delete";
import { Badge } from "@/components/ui/badge";

export default function AddressCard(details: Address & { tag: AddressTag }) {
  const {
    address,
    city,
    country,
    state,
    zip,
    userIdentifier,
    label,
    tag,
    street,
    customLabel,
  } = details;
  return (
    <div className="w-full h-auto p-4 border rounded-2xl relative">
      <div className="space-y-2 text-sm mt-4">
        <p className="font-semibold line-clamp-1">Address</p>

        <div className="space-y-1">
          <p className="text-muted-foreground line-clamp-1">
            {address}, {street}
          </p>

          <p className="text-muted-foreground line-clamp-1">
            <span>{city}</span>, <span>{state}</span> {zip}
          </p>

          <p className="text-muted-foreground">{country}</p>
        </div>

        <p>
          Phone number:{" "}
          <span className="text-muted-foreground line-clamp-1">
            {userIdentifier}
          </span>
        </p>
      </div>
      <div className="flex items-center justify-end gap-2 capitalize">
        {tag !== "NONE" && (
          <>
            <Badge className=" bg-maroon! text-white!">
              {tag.toLowerCase()}
            </Badge>
          </>
        )}
        <Badge className=" bg-maroon! text-white! capitalize">
          {label === "CUSTOM" ? <>{customLabel}</> : <>{label.toLowerCase()}</>}
        </Badge>
      </div>
      <div className="flex gap-2 absolute top-4 right-4">
        <UpdateAddressForm address={details}></UpdateAddressForm>

        <DeleteAddress {...details}></DeleteAddress>
      </div>
    </div>
  );
}
