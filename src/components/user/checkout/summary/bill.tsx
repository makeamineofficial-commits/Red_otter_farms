"use client";

import { formatPrice } from "@/lib/utils";
import { useCart } from "@/provider/cart.provider";
import { useCheckout } from "@/provider/checkout.provider";
import React, { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type BillItem = {
  label: string;
  value: number;
};

function BillSkeleton() {
  return (
    <div className="space-y-3 border-t py-4 animate-pulse">
      <h3 className="text-sm font-semibold">Bill Summary</h3>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Subtotal</span>
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Delivery Fee</span>
          <Skeleton className="h-3 w-14" />
        </div>
      </div>

      <div className="border-t pt-3 flex justify-between">
        <span className="font-semibold">Total</span>
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export default function Bill() {
  const { cart, isLoading, isUpdating } = useCart();
  const { shippingRate } = useCheckout();

  const subtotal = useMemo(() => {
    return (
      cart?.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0,
      ) ?? 0
    );
  }, [cart]);

  const total = useMemo(
    () => subtotal + shippingRate,
    [subtotal, shippingRate],
  );

  if (isLoading || isUpdating) {
    return <BillSkeleton />;
  }

  return (
    <div className="space-y-3 border-t py-4">
      <h3 className="text-sm font-semibold">Bill Summary</h3>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>₹{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Delivery Fee</span>
          <span>₹{formatPrice(shippingRate)}</span>
        </div>
      </div>

      <div className="border-t pt-3 flex items-center justify-between">
        <span className="font-semibold">Total</span>
        <span className="font-semibold text-base">₹{formatPrice(total)}</span>
      </div>
    </div>
  );
}
