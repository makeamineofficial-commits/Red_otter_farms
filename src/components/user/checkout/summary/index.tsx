"use client";
import React from "react";
import Products from "@/components/common/cartProduct";
import Bill from "./bill";
export default function Summary() {
  return (
    <div className="w-full border p-4 rounded-2xl">
      <div className="font-medium text-lg pb-3">Order Summary</div>
      <Products></Products>
      <Bill></Bill>
    </div>
  );
}
