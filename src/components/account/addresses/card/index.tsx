"use client";

import { Address, AddressTag } from "@/types/account";
import UpdateAddressForm from "../update";
import DeleteAddress from "../delete";
import { Badge } from "@/components/ui/badge";
const fallback = (value?: string, placeholder?: string) =>
  value && value.trim().length > 0 ? value : placeholder;

const DUMMY_ADDRESS = {
  address: "D-**/** J**** Flats, Sec **",
  city: "Noida",
  state: "Uttar Pradesh",
  zip: "20****",
  country: "India",
  phone: "9XXXXXXXXX",
};

export default function AddressCard(details: Address & { tag: AddressTag }) {
  const { address, city, country, state, zip, phone, tag } = details;
  return (
    <div className="w-full h-auto p-4 border rounded-2xl relative">
      {tag !== "NONE" && (
        <>
          <Badge className="absolute bottom-2 right-2 bg-maroon! text-white!">
            {tag}
          </Badge>
        </>
      )}
      <div className="space-y-2 text-sm mt-4">
        <p className="font-semibold line-clamp-1">Address</p>

        <div className="space-y-1">
          <p className="text-muted-foreground line-clamp-1">
            {fallback(address, DUMMY_ADDRESS.address)}
          </p>

          <p className="text-muted-foreground line-clamp-1">
            <span>{fallback(city, DUMMY_ADDRESS.city)}</span>,{" "}
            <span>{fallback(state, DUMMY_ADDRESS.state)}</span>{" "}
            {fallback(zip, DUMMY_ADDRESS.zip)}
          </p>

          <p className="text-muted-foreground">
            {fallback(country, DUMMY_ADDRESS.country)}
          </p>
        </div>

        <p>
          Phone number:{" "}
          <span className="text-muted-foreground line-clamp-1">
            {fallback(phone, DUMMY_ADDRESS.phone)}
          </span>
        </p>
      </div>

      <div className="flex gap-2 absolute top-4 right-4">
        <UpdateAddressForm {...details}></UpdateAddressForm>

        <DeleteAddress {...details}></DeleteAddress>
      </div>
    </div>
  );
}
