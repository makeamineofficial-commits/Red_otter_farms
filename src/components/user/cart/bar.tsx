"use client";

import { useCart } from "@/provider/cart.provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NutritionSummaryRow } from "./nutritionMeter";
import { useState } from "react";
export default function Bar() {
  const { cart } = useCart();
  const pathname = usePathname();

  const items = cart?.items || [];

  if (!items.length) return null;

  if (pathname === "/checkout") return <></>;
  return (
    <>
      <div className="py-2 flex md:hidden fixed justify-between w-full bg-herbal bottom-0 left-1/2 -translate-x-1/2 z-50  items-center  gap-2">
        <NutritionSummaryRow></NutritionSummaryRow>
        <Link href="/checkout">
          <div className="bg-forest py-4 rounded-l-md px-3 flex items-center gap-2">
            <div className="flex flex-col  ml-1 text-white">
              <h2 className="text-sm font-medium">View Cart</h2>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
