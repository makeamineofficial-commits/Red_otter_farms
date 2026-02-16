"use client";

import { formatPrice } from "@/lib/utils";
import { useCart } from "@/provider/cart.provider";
import { useCheckout } from "@/provider/checkout.provider";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

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
  const { cart, isLoading, isUpdating, discount } = useCart();
  const { shippingRate, showEstimate, isFetching } = useCheckout();

  const subtotal = useMemo(() => {
    return (
      cart?.items.reduce(
        (sum, product) =>
          sum + product.variant.price * discount * product.quantity,
        0,
      ) ?? 0
    );
  }, [cart]);

  const total = useMemo(
    () => subtotal + shippingRate,
    [subtotal, shippingRate],
  );

  if (isLoading || isUpdating || isFetching) {
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
          <div>
            <span>Delivery Fee</span>
            {shippingRate === 0 && (
              <Badge className="ml-2 bg-maroon">Otter Pass Active</Badge>
            )}
          </div>

          <span className="flex items-center gap-1">
            ₹{formatPrice(shippingRate)}
            {shippingRate > 0 && showEstimate && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help text-xs underline decoration-dotted">
                      Estimated
                    </span>
                  </TooltipTrigger>

                  <TooltipContent className="max-w-75 text-xs leading-relaxed">
                    The pincode you’ve entered requires external shipping, so
                    delivery charges may vary slightly at final payment based on
                    courier availability.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </span>
        </div>
      </div>

      <div className="border-t pt-3 flex items-center justify-between">
        <span className="font-semibold">Total</span>
        <span className="font-semibold text-base">₹{formatPrice(total)}</span>
      </div>
    </div>
  );
}
