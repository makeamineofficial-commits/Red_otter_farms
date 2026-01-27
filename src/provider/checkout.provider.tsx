"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { getShippingRate } from "@/actions/checkout/shipping.action";
import { useCart } from "./cart.provider";

export interface BillingDetails {
  mobile: string;
  firstName: string;
  lastName: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  createAccount: boolean;
}

export interface ShippingDetails {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  notes?: string;
  courier?: string;
}

const DEFAULT_BILLING: BillingDetails = {
  mobile: "",
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "India",
  createAccount: false,
};

const DEFAULT_SHIPPING: ShippingDetails = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "India",
  notes: "",
  courier: "Flat Rate",
};

type ContextType = {
  shipping: ShippingDetails;
  setShipping: Dispatch<SetStateAction<ShippingDetails>>;
  billing: BillingDetails;
  setBilling: Dispatch<SetStateAction<BillingDetails>>;
  fetchingRate: boolean;
  total: number;
  shippingRate: number;
  subtotal: number;
};

const CheckoutContext = createContext<ContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [billing, setBilling] = useState<BillingDetails>(DEFAULT_BILLING);
  const [shipping, setShipping] = useState<ShippingDetails>(DEFAULT_SHIPPING);

  const [shippingRate, setShippingRate] = useState<number>(9900);
  const [fetchingRate, setFetchingRate] = useState<boolean>(false);

  const lastFetchedPincode = useRef<string | null>(null);
  const { cart } = useCart();

  const resolveShippingRate = async (pincode: string) => {
    if (pincode.length !== 6) return;

    if (lastFetchedPincode.current === pincode) return;
    lastFetchedPincode.current = pincode;
    try {
      setFetchingRate(true);
      const res = await getShippingRate({
        deliveryPincode: pincode,
      });
      if (res.success) {
        setShippingRate(res.rate);
      }
    } catch (error) {
      setShippingRate(9900);
    } finally {
      setFetchingRate(false);
    }
  };

  useEffect(() => {
    const pincode = shipping.zip?.trim();
    if (!pincode) return;
    if (!/^\d{6}$/.test(pincode)) return;

    resolveShippingRate(pincode);
  }, [shipping.zip]);

  const subtotal = useMemo(() => {
    return (
      cart?.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0,
      ) ?? 0
    );
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
        fetchingRate,
        total,
        subtotal,
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
