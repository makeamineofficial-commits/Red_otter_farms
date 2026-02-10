"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";
import { getShippingRate } from "@/actions/checkout/shipping.action";
import { useCart } from "./cart.provider";
import { isNCRPincode } from "@/lib/utils";
import {
  BillingDetails,
  ShippingDetails,
  PaymentMethod,
} from "@/types/payment";
import { getCartTotal } from "@/actions/user/cart/util";
import { Cart } from "@/types/cart";

const DEFAULT_BILLING: BillingDetails = {
  zip: "110057",
  city: "New Delhi",
  phone: "8800960547",
  firstName: "Damanjeet",
  lastName: "Singh",
  email: "damanjeetsingh434@gmail.com",
  address: "20, Paschimi Marg (2nd floor), Block D, Vasant Vihar",
  state: "DL",
  country: "IN",
  createAccount: false,
};

const DEFAULT_SHIPPING: ShippingDetails = {
  phone: "8800960547",
  firstName: "Damanjeet",
  lastName: "Singh",
  address: "20, Paschimi Marg (2nd floor), Block D, Vasant Vihar",
  zip: "110057",
  city: "New Delhi",
  state: "DL",
  country: "IN",
  notes: "",
  courier: "",
};

type ContextType = {
  shipping: ShippingDetails;
  setShipping: Dispatch<SetStateAction<ShippingDetails>>;
  billing: BillingDetails;
  setBilling: Dispatch<SetStateAction<BillingDetails>>;
  isFetching: boolean;
  total: number;
  shippingRate: number;
  subtotal: number;
  showEstimate: boolean;
  paymentMethod: PaymentMethod;
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethod>>;
};

const CheckoutContext = createContext<ContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [billing, setBilling] = useState<BillingDetails>(DEFAULT_BILLING);
  const [shipping, setShipping] = useState<ShippingDetails>(DEFAULT_SHIPPING);
  const [shippingRate, setShippingRate] = useState<number>(9900);
  const [subtotal, setSubTotal] = useState<number>(0);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [showEstimate, setShowEstimate] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.RAZORPAY);
  const { cart } = useCart();

  const resolveShippingRate = async (pincode: string) => {
    try {
      setFetching(true);
      const res = await getShippingRate({
        deliveryPincode: pincode,
      });
      if (res.success) {
        setShippingRate(res.rate);
      }
    } catch (error) {
      setShippingRate(9900);
    } finally {
      setFetching(false);
    }
  };

  const resolveSubTotal = async (cart: Cart) => {
    try {
      setFetching(true);
      const res = await getCartTotal(cart);
      setSubTotal(res);
      return res;
    } catch (err) {
      return 0;
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    const pincode = shipping.zip?.trim();
    if (!pincode) return;
    if (!/^\d{6}$/.test(pincode)) return;
    const isNCR = isNCRPincode(pincode);
    setShowEstimate(!isNCR);
    resolveShippingRate(pincode);
  }, [shipping.zip, cart]);

  useEffect(() => {
    if (!cart) return;
    resolveSubTotal(cart);
  }, [cart]);

  const total = useMemo(() => {
    return subtotal + shippingRate;
  }, [subtotal, shippingRate]);

  return (
    <CheckoutContext.Provider
      value={{
        shipping,
        setShipping,
        billing,
        setBilling,
        shippingRate,
        isFetching,
        total,
        subtotal,
        showEstimate,

        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
};
