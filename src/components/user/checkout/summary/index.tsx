"use client";
import React from "react";
import { CheckoutProducts } from "@/components/common/cartProduct";
import Bill from "./bill";
import { useCheckout } from "@/provider/checkout.provider";

export default function Summary() {
  const { availabilityConflict, quantityConflict } = useCheckout();

  return (
    <>
      <div className="w-full border p-4 rounded-2xl">
        <div className="font-medium text-lg pb-3">Order Summary</div>

        <CheckoutProducts />
        <Bill />
      </div>
      {quantityConflict && (
        <div className=" rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          One or more products are not available in the requested quantity.
          Please reduce the quantity to proceed.
        </div>
      )}

      {/* 🔴 Shipping Availability Conflict */}
      {availabilityConflict && (
        <div className=" rounded-md border border-orange-300 bg-orange-50 px-4 py-3 text-sm text-orange-700">
          One or more products are not available for the shipping address you
          have entered.
        </div>
      )}
    </>
  );
}
