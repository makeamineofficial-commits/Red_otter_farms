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

  const { billing, shipping, paymentMethod } = useCheckout();
  const [orderId, setOrderId] = useState<string | null>(null);
  const { cart, setLockCart } = useCart();
  const { setCheckingOut } = useCheckout();
  const validateBilling = (billing: BillingDetails) => {
    if (!billing) return false;

    const requiredFields: (keyof BillingDetails)[] = [
      "phone",
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
      "zip",
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
    if (!billing || !shipping)
      return {
        sucess: false,
        message: "Billing & Shipping details are missing",
      };
    const billingError = validateBilling(billing);
    if (billingError) return { success: false, message: billingError };

    const shippingError = validateShipping(shipping);
    if (shippingError) return { success: false, message: shippingError };

    if (!cart || cart.items.length === 0)
      return { success: false, message: "Your cart is empty." };

    try {
      setCheckingOut(true);
      setLockCart(true);
      const res = await getCheckout({
        paymentMethod,
        billing,
        shipping,
      });

      if (!res.success) {
        return {
          success: false,
          message: res.message ?? "Failed to create order. Please try again.",
        };
      }

      if (
        (res.paymentMethod === PaymentMethod.RAZORPAY ||
          res.paymentMethod === PaymentMethod.SPLIT) &&
        res.razorPayOrderId
      ) {
        setOrderId(res.razorPayOrderId);
        return {
          success: true,
          message: "Order Created Successfully",
        };
      }
      if (res.paymentMethod === PaymentMethod.OTTER) {
        window.location.replace(`/checkout/placed/${res.orderId}`);
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
      setLockCart(false);
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

  return { checkout, orderId, setOrderId };
};
