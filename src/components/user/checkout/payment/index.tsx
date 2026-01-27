"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCheckoutHandler } from "@/hooks/use-checkout";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/provider/cart.provider";
import { useCheckout } from "@/provider/checkout.provider";
import Image from "next/image";

function PaymentSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-4 border rounded-2xl animate-pulse">
      <Skeleton className="h-12 w-full rounded-md" />
      <Skeleton className="h-px w-full" />
      <Skeleton className="h-12 w-full rounded-md" />
    </div>
  );
}

export default function Payment() {
  const { fetchingRate, total } = useCheckout();
  const { cart, isLoading, isUpdating } = useCart();
  const { checkout } = useCheckoutHandler();

  const isDisabled =
    isLoading ||
    isUpdating ||
    fetchingRate ||
    !cart ||
    cart.products.length === 0;

  if (isLoading || isUpdating) {
    return <PaymentSkeleton />;
  }

  return (
    <div className="flex flex-col gap-2 p-4 border rounded-2xl">
      {/* Razorpay */}
      <Button
        onClick={async () => {
          if (isDisabled) return;
          const orderId = await checkout();
          console.log("payment flow started")
          // use the order to start the payment
        }}
        className="w-full py-4 h-auto! text-base bg-white border-forest
                   flex items-center gap-1.5"
        size="lg"
        variant="outline"
        disabled={isDisabled}
      >
        <span className="text-forest">{`Pay ₹${formatPrice(total)} with`}</span>

        <Image
          height={20}
          width={90}
          alt="Razorpay"
          src="/extras/razorpay.png"
          className="object-contain"
        />
      </Button>

      <Separator />

      {/* Wallet */}
      <Button
        onClick={() => {
          if (isDisabled) return;
        }}
        className="w-full py-4 h-auto! text-base bg-white border-forest
                   flex items-center gap-1.5"
        size="lg"
        variant="outline"
        disabled={isDisabled}
      >
        <span className="text-forest">
          {`Pay ₹${formatPrice(total)} with Otter Wallet`}
        </span>
      </Button>
    </div>
  );
}
