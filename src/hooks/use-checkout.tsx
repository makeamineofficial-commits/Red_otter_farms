import {
  useCheckout,
  BillingDetails,
  ShippingDetails,
} from "@/provider/checkout.provider";
import { useCart } from "@/provider/cart.provider";
import { toast } from "sonner";
import { getRazorpayOrderId } from "@/actions/checkout/razorpay.action";

interface CheckoutResult {
  success: boolean;
  message: string;
  orderId?: string;
}

export const useCheckoutHandler = () => {
  const { billing, shipping, shippingRate, fetchingRate, total, subtotal } =
    useCheckout();
  const { cart, isLoading, isUpdating } = useCart();
  const validateBilling = (billing: BillingDetails) => {
    const requiredFields: (keyof BillingDetails)[] = [
      "mobile",
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
    if (!/^\d{10}$/.test(billing.mobile))
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

  const _checkout = async (): Promise<CheckoutResult> => {
    const billingError = validateBilling(billing);
    if (billingError) return { success: false, message: billingError };

    const shippingError = validateShipping(shipping);
    if (shippingError) return { success: false, message: shippingError };

    if (!cart || cart.products.length === 0)
      return { success: false, message: "Your cart is empty." };

    try {
      const orderRes = await getRazorpayOrderId({
        shippingPincode: shipping.zip,
      });

      if (!orderRes.success || !orderRes.orderId) {
        return {
          success: false,
          message: "Failed to create order. Please try again.",
        };
      }

      return {
        success: true,
        message: "Order created successfully",
        orderId: orderRes.orderId,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong during checkout.",
      };
    }
  };

  const checkout = async () => {
    const res = await _checkout();
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    if (!res.orderId) {
      toast.warning("Failed to start a payment session");
      return;
    }
    return res.orderId;
  };

  return { checkout };
};
