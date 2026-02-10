"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCheckoutHandler } from "@/hooks/user/use-checkout";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/provider/cart.provider";
import { useCheckout } from "@/provider/checkout.provider";
import Image from "next/image";
import { Check } from "lucide-react";
import { PaymentMethod } from "@/types/payment";
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
  const { isFetching, paymentMethod, setPaymentMethod } = useCheckout();

  const { cart, isLoading, isUpdating } = useCart();

  const isDisabled =
    isLoading || isUpdating || isFetching || !cart || cart.items.length === 0;

  if (isDisabled) {
    return <PaymentSkeleton />;
  }

  return (
    <div className="flex flex-col gap-3 p-4 border rounded-2xl">
      {/* Razorpay */}
      <PaymentOption
        selected={paymentMethod === PaymentMethod.RAZORPAY}
        onClick={() => setPaymentMethod(PaymentMethod.RAZORPAY)}
      >
        <div className="flex items-center gap-2">
          <Image
            height={20}
            width={90}
            alt="Razorpay"
            src="/extras/razorpay.png"
            className="object-contain"
          />

          <span className="text-sm text-muted-foreground">
            Pay using UPI / Card / Netbanking
          </span>
        </div>
      </PaymentOption>

      <Separator />

      {/* Wallet */}
      <PaymentOption
        selected={paymentMethod === PaymentMethod.OTTER}
        onClick={() => setPaymentMethod(PaymentMethod.OTTER)}
      >
        <span className="font-medium text-forest">Otter Wallet</span>
      </PaymentOption>
    </div>
  );
}

function PaymentOption({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center justify-between
        p-3 rounded-xl border transition
        ${
          selected
            ? "border-forest bg-forest/5"
            : "border-gray-200 hover:border-forest/60"
        }
      `}
    >
      <div className="flex items-center gap-2">
        {/* Checkbox */}
        <div
          className={`
            h-5 w-5 rounded-full border flex items-center justify-center
            ${selected ? "bg-forest border-forest" : "border-gray-400"}
          `}
        >
          {selected && <Check size={14} className="text-white" />}
        </div>

        {children}
      </div>
    </button>
  );
}
