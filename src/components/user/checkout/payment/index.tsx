"use client";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/provider/cart.provider";
import { useCheckout } from "@/provider/checkout.provider";
import Image from "next/image";
import { Check, Info } from "lucide-react";
import { PaymentMethod } from "@/types/payment";
import { useAccountStore } from "@/store/user/account.store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMemo } from "react";
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
  const {
    data: user,
    isFetching: userFetching,
    isLoading: userLoading,
  } = useAccountStore();
  const { cart, isLoading, isUpdating, discount } = useCart();
  const { shippingRate } = useCheckout();

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
  const isDisabled =
    userFetching ||
    userLoading ||
    isLoading ||
    isUpdating ||
    isFetching ||
    !cart ||
    cart.items.length === 0;

  if (isDisabled) {
    return <PaymentSkeleton />;
  }

  const lessBalance = user && Number(user.otter_wallet || "0") < total / 100;

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
        disable={!user}
        selected={paymentMethod === PaymentMethod.OTTER}
        onClick={() => setPaymentMethod(PaymentMethod.OTTER)}
      >
        <div className="flex justify-between items-center w-full ">
          <span className="font-medium text-forest ">Otter Wallet</span>
          {lessBalance ? (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`font-bold underline flex items-center space-x-1 text-red-500`}
                    >
                      <span>₹ </span>
                      <span>
                        {Number(user?.otter_wallet || "0").toFixed(2)}
                      </span>
                    </span>
                  </TooltipTrigger>

                  <TooltipContent className="max-w-64 text-xs leading-relaxed">
                    Your Otter Wallet balance is low. You can still proceed with
                    checkout and pay the remaining amount via Razorpay.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            <>
              <span className={`font-bold flex items-center space-x-1`}>
                <span>₹ </span>
                <span>{Number(user?.otter_wallet || "0").toFixed(2)}</span>
              </span>
            </>
          )}
        </div>
      </PaymentOption>
    </div>
  );
}

function PaymentOption({
  selected,
  onClick,
  children,
  disable = false,
}: {
  disable?: boolean;
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      disabled={disable}
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center justify-between
        p-3 rounded-xl border transition
        ${disable && "opacity-60! hover:border-forest/5! cursor-not-allowed"}
        ${
          selected
            ? "border-forest bg-forest/5"
            : "border-gray-200 hover:border-forest/60"
        }
      `}
    >
      <div className="flex items-center gap-2 w-full">
        {/* Checkbox */}
        <div
          className={`
            h-5 w-5 rounded-full border flex items-center justify-center 
            ${selected ? "bg-forest border-forest" : "border-gray-400"}
          `}
        >
          {selected && <Check size={14} className="text-white" />}
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </button>
  );
}
