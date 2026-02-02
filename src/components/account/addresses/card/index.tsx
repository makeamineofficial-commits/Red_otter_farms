"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Address } from "@/types/account";
import UpdateAddressForm from "../update";
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

export default function AddressCard(details: Address & { name: string }) {
  const { address, city, country, state, name, zip, phone } = details;
  return (
    <div className="w-full h-auto p-4 border rounded-2xl relative">
      <div className="space-y-2 text-sm mt-4">
        <p className="font-semibold line-clamp-1">{name || "Your Name"}</p>

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

        <button>
          <Trash2 size={15} className="stroke-1 text-red-500" />
        </button>
      </div>
    </div>
  );
}
