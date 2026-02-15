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
import { useAccountStore } from "@/store/user/account.store";
import { useAddressStore } from "@/store/user/address.store";

type ContextType = {
  shipping?: ShippingDetails;
  setShipping: Dispatch<SetStateAction<ShippingDetails | undefined>>;
  billing?: BillingDetails;
  setBilling: Dispatch<SetStateAction<BillingDetails | undefined>>;
  isFetching: boolean;
  total: number;
  shippingRate: number;
  subtotal: number;
  showEstimate: boolean;
  paymentMethod: PaymentMethod;
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethod>>;
  setCreateAccount: Dispatch<SetStateAction<boolean>>;
  setSameAsBilling: Dispatch<SetStateAction<boolean>>;
};

const CheckoutContext = createContext<ContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const { data: user } = useAccountStore();
  const { data: address } = useAddressStore();
  const [createAccount, setCreateAccount] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const [billing, setBilling] = useState<BillingDetails | undefined>();
  const [shipping, setShipping] = useState<ShippingDetails | undefined>();
  useEffect(() => {
    console.log("here", user, address);
    // if (!user) return;
    const shippingAddress = address?.addresses?.find(
      (ele) => ele.tag === "SHIPPING",
    );
    const billingAddress = address?.addresses?.find(
      (ele) => ele.tag === "BILLING",
    );
    const DEFAULT_ADDRESS = {
      address: "123 Test Street",
      city: "New Delhi",
      zip: "110001",
      state_code: "DL",
      country_code: "IN",
      attention: "",
    };
    const finalShipping = shippingAddress ?? DEFAULT_ADDRESS;
    const finalBilling = billingAddress ?? DEFAULT_ADDRESS;

    setShipping({
      phone: user?.phone ?? "9999999999",
      firstName: user?.first_name ?? "Test",
      lastName: user?.last_name ?? "User",
      address: finalShipping.address ?? "",
      zip: finalShipping.zip ?? "",
      city: finalShipping.city ?? "",
      state: finalShipping.state_code ?? "",
      country: finalShipping.country_code ?? "",
      notes: finalShipping.attention,
      courier: "",
    });

    setBilling({
      zip: finalBilling.zip ?? "",
      city: finalBilling.city ?? "",
      phone: user?.phone ?? "0000000000",
      firstName: user?.first_name ?? "Test2",
      lastName: user?.last_name ?? "User2",
      email: "test123@example.com",
      address: finalBilling.address ?? "",
      state: finalBilling.state_code ?? "",
      country: finalBilling.country_code ?? "",
      createAccount,
    });
  }, [user, address, createAccount]);

  useEffect(() => {
    if (!sameAsBilling || !billing) return;
    setShipping((prev) => ({
      phone: billing.phone ?? "",
      firstName: user?.first_name ?? "",
      lastName: user?.last_name ?? "",
      address: billing.address ?? "",
      zip: billing.zip ?? "",
      city: billing.city ?? "",
      state: billing.state ?? "",
      country: billing.country ?? "",
      notes: prev?.notes,
      courier: prev?.courier,
    }));
  }, [sameAsBilling, billing, user]);

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
    if (!shipping) return;
    const pincode = shipping.zip?.trim();
    if (!pincode) return;
    if (!/^\d{6}$/.test(pincode)) return;
    const isNCR = isNCRPincode(pincode);
    setShowEstimate(!isNCR);
    resolveShippingRate(pincode);
  }, [shipping?.zip, cart]);

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
        setCreateAccount,
        setSameAsBilling,
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
