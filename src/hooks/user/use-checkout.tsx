import { useCheckout } from "@/provider/checkout.provider";
import { useCart } from "@/provider/cart.provider";
import { toast } from "sonner";
import { getCheckout } from "@/actions/checkout/checkout.action";
import {
  BillingDetails,
  PaymentMethod,
  ShippingDetails,
} from "@/types/payment";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useCheckoutHandler = () => {
  const { replace } = useRouter();
  const [isCheckingOut, setCheckingOut] = useState(false);
  const { billing, shipping, paymentMethod } = useCheckout();
  const [orderId, setOrderId] = useState<string | null>(null);
  const { cart } = useCart();
  const validateBilling = (billing: BillingDetails) => {
    const requiredFields: (keyof BillingDetails)[] = [
      "phone",
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
      "zip",
      "country",
    ];
    for (const field of requiredFields) {
      if (
        !billing[field] ||
        (typeof billing[field] === "string" && billing[field].trim()) === ""
      ) {
        return `Billing ${field} is required`;
      }
    }
    if (!/^\d{6}$/.test(billing.zip))
      return "Billing zip code must be 6 digits";
    if (!/^\d{10}$/.test(billing.phone))
      return "Billing mobile must be 10 digits";
    return null;
  };

  const validateShipping = (shipping: ShippingDetails) => {
    const requiredFields: (keyof ShippingDetails)[] = [
      "address",
      "city",
      "state",
      "zip",
      "country",
    ];
    for (const field of requiredFields) {
      if (!shipping[field] || shipping[field].trim() === "") {
        return `Shipping ${field} is required`;
      }
    }
    if (!/^\d{6}$/.test(shipping.zip))
      return "Shipping zip code must be 6 digits";
    return null;
  };

  const _checkout = async () => {
    const billingError = validateBilling(billing);
    if (billingError) return { success: false, message: billingError };

    const shippingError = validateShipping(shipping);
    if (shippingError) return { success: false, message: shippingError };

    if (!cart || cart.items.length === 0)
      return { success: false, message: "Your cart is empty." };

    try {
      setCheckingOut(true);
      const res = await getCheckout({
        paymentMethod,
        // @ts-ignore
        shipping,
        // @ts-ignore
        billing,
      });

      if (!res.success) {
        return {
          success: false,
          message: res.message ?? "Failed to create order. Please try again.",
        };
      }

      if (paymentMethod === PaymentMethod.RAZORPAY && res.orderId) {
        setOrderId(res.orderId);
        return {
          success: true,
          message: "Order Created Successfully",
        };
      }
      if (paymentMethod === PaymentMethod.OTTER) {
        replace("/order-placed");
        return {
          success: true,
          message: "Order Created Successfully",
        };
      }

      return {
        success: false,
        message: "Failed to create order. Please try again.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to create order. Please try again.",
      };
    } finally {
      setCheckingOut(false);
    }
  };

  const checkout = async () => {
    const res = await _checkout();
    if (!res.success) {
      toast.error(res.message);
      return;
    }
  };

  return { checkout, orderId, isCheckingOut, setOrderId };
};
