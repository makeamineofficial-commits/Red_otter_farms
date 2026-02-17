"use client";

import { afterCheckout } from "@/actions/checkout/checkout.action";
import { Button } from "@/components/ui/button";
import { useCheckoutHandler } from "@/hooks/user/use-checkout";
import { useCart } from "@/provider/cart.provider";
import { useCheckout } from "@/provider/checkout.provider";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Pay() {
  const { isFetching, isCheckingOut } = useCheckout();
  const paymentSuccessRef = useRef(false);

  const { cart, isLoading, isUpdating } = useCart();

  const { checkout, orderId, setOrderId } = useCheckoutHandler();
  const isDisabled =
    isLoading ||
    isUpdating ||
    isFetching ||
    isCheckingOut ||
    !cart ||
    cart.items.length === 0;

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!orderId) return;

    openRazorpay(orderId);
  }, [orderId]);

  const openRazorpay = (orderId: string) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      currency: "INR",
      name: "Otter Store",
      description: "Order Payment",
      order_id: orderId,

      handler: async function (response: any) {
        paymentSuccessRef.current = true;
        setOrderId(null);
        const res = await afterCheckout();
        window.location.replace(`/checkout/placed/${res?.orderId}`);
      },
      theme: {
        color: "#15803d",
      },

      modal: {
        ondismiss: async function () {
          setOrderId(null);
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.open();
  };

  return (
    <Button
      variant="outline"
      onClick={async () => {
        if (isDisabled) return;

        await checkout();
      }}
      className="w-full py-4 h-auto! rounded-2xl! text-base border-forest
                 flex items-center gap-1.5"
      size="sm"
      disabled={isDisabled}
    >
      {isCheckingOut ? "Processing..." : "Pay"}
    </Button>
  );
}
