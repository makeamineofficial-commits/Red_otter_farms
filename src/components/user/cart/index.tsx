"use client";

import { Handbag, X } from "lucide-react";
import { Suspense, useEffect } from "react";
import Products from "@/components/common/cartProduct";
import { useCart } from "@/provider/cart.provider";
import NutritionMeter from "./nutritionMeter";
import Checkout from "./checkout";
function _Cart() {
  const { isOpen, toggle, cart } = useCart();
  return (
    <>
      <div className="relative">
        {cart?.products.length === 0 ? (
          <></>
        ) : (
          <div className="h-4 w-4 rounded-full bg-forest text-center text-white text-[10px] flex justify-center items-center absolute -top-1 -right-1">
            {cart?.products.reduce(
              (total, product) => total + product.quantity,
              0,
            )}
          </div>
        )}
        <Handbag
          className="stroke-1 stroke-red-500 size-8 lg:size-9 cursor-pointer"
          onClick={() => {
            toggle();
          }}
        />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => toggle()}
        />
      )}

      <div
        className={`fixed flex flex-col  top-0 right-0 h-screen w-full md:w-96 overflow-y-auto no-scrollbar bg-white shadow-2xl z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="font-semibold">CART</h2>
          <button onClick={() => toggle()}>
            <X />
          </button>
        </div>

        <div className="p-4">
          <Products></Products>
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-50 shadow-xl">
          <NutritionMeter></NutritionMeter>
          <Checkout></Checkout>
        </div>
      </div>
    </>
  );
}

export default function Cart() {
  return (
    <Suspense fallback={<></>}>
      <_Cart />
    </Suspense>
  );
}
