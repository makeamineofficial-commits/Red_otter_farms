"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { getShippingRate } from "@/actions/checkout/shipping.action";
import { useCart } from "./cart.provider";
import { isNCRPincode } from "@/lib/utils";
import {
  BillingDetails,
  ShippingDetails,
  PaymentMethod,
} from "@/types/payment";

import { useAccountStore } from "@/store/user/account.store";
import { useAddressStore } from "@/store/user/address.store";

type ContextType = {
  shipping?: ShippingDetails;
  setShipping: Dispatch<SetStateAction<ShippingDetails | undefined>>;
  billing?: BillingDetails;
  setBilling: Dispatch<SetStateAction<BillingDetails | undefined>>;
  isFetching: boolean;
  shippingRate: number;
  showEstimate: boolean;
  paymentMethod: PaymentMethod;
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethod>>;
  setSameAsBilling: Dispatch<SetStateAction<boolean>>;
  isCheckingOut: boolean;
  setCheckingOut: Dispatch<SetStateAction<boolean>>;

  availabilityConflict: boolean;
  quantityConflict: boolean;
};

const CheckoutContext = createContext<ContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const { data: user } = useAccountStore();
  const { data: addressDetails } = useAddressStore();
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [isCheckingOut, setCheckingOut] = useState(false);
  const [billing, setBilling] = useState<BillingDetails | undefined>();
  const [shipping, setShipping] = useState<ShippingDetails | undefined>();
  const [availabilityConflict, setAvailabilityConflict] = useState(false);
  const [quantityConflict, setQuantityConflict] = useState(false);
  const { shippingAddress, billingAddress } = addressDetails ?? {};
  const { cart } = useCart();

  useEffect(() => {
    if (!cart) return;
    const quantityConflict = cart.items.reduce(
      (prev, cur) => prev || cur.quantity > cur.variant.availableInStock,
      false,
    );
    setQuantityConflict(quantityConflict);
    if (!shipping || !shipping.zip) return;
    const hasNonDryStoreItem = cart.items.some(
      (item) => !item.product.isDrystore,
    );
    const isNCR = isNCRPincode(shipping.zip);
    setAvailabilityConflict(!isNCR && hasNonDryStoreItem);
  }, [shipping?.zip, cart]);

  useEffect(() => {
    const DEFAULT_ADDRESS = {
      addressId: "",
      address: "123 Test Street",
      street: "Test Street",
      city: "New Delhi",
      zip: "110001",
      state: "Delhi",
      country: "India",
      stateCode: "DL",
      countryCode: "IN",
      attention: "",
    };
    const finalShipping = shippingAddress ?? DEFAULT_ADDRESS;
    const finalBilling = billingAddress ?? DEFAULT_ADDRESS;
    const phone = user?.mobile?.replace("+91", "");

    setShipping({
      addressId:
        finalShipping.addressId === "" ? null : finalShipping.addressId,
      phone: phone ?? "9999999999",
      firstName: user?.first_name ?? "Test",
      lastName: user?.last_name ?? "User",
      address: finalShipping.address ?? "",
      street: finalShipping.street ?? "",
      zip: finalShipping.zip ?? "",
      city: finalShipping.city ?? "",
      state: finalShipping.state ?? "",
      country: finalShipping.country ?? "",
      stateCode: finalShipping.stateCode,
      countryCode: finalShipping.countryCode,
      notes: finalShipping.attention,
      courier: "Red Otter",
    });

    setBilling({
      addressId: finalBilling.addressId === "" ? null : finalBilling.addressId,
      phone: phone ?? "9999999999",
      firstName: user?.first_name ?? "Test",
      lastName: user?.last_name ?? "User",
      address: finalBilling.address ?? "",
      street: finalBilling.street ?? "",
      zip: finalBilling.zip ?? "",
      city: finalBilling.city ?? "",
      state: finalBilling.state ?? "",
      country: finalBilling.country ?? "",
      stateCode: finalBilling.stateCode,
      countryCode: finalBilling.countryCode,
    });
  }, [user, addressDetails]);

  useEffect(() => {
    if (!sameAsBilling || !billing) return;
    const phone = user?.mobile?.replace("+91", "");
    setShipping((prev) => ({
      phone,
      addressId: billing.addressId === "" ? null : billing.addressId,
      firstName: user?.first_name ?? "Test",
      lastName: user?.last_name ?? "User",
      address: billing.address ?? "",
      street: billing.street ?? "",
      zip: billing.zip ?? "",
      city: billing.city ?? "",
      state: billing.state ?? "",
      country: billing.country ?? "",
      stateCode: billing.stateCode,
      countryCode: billing.countryCode,
      notes: prev?.notes ?? "",
      courier: prev?.courier ?? "",
    }));
  }, [sameAsBilling, billing, user]);

  const [shippingRate, setShippingRate] = useState<number>(9900);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [showEstimate, setShowEstimate] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.RAZORPAY);

  const resolveShippingRate = async (pincode: string) => {
    try {
      setFetching(true);
      const res = await getShippingRate({
        deliveryPincode: pincode,
      });
      if (res.success) {
        setShipping((prev) =>
          prev ? { ...prev, courier: res.courier } : prev,
        );
        setShippingRate(res.rate);
      }
    } catch (error) {
      setShippingRate(9900);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!shipping) return;
    if (user && user.otter_pass) {
      setShippingRate(0);
      return;
    }
    const pincode = shipping.zip?.trim();
    if (!pincode) return;
    if (!/^\d{6}$/.test(pincode)) return;
    const isNCR = isNCRPincode(pincode);
    setShowEstimate(!isNCR);
    resolveShippingRate(pincode);
  }, [shipping?.zip, cart, user]);

  return (
    <CheckoutContext.Provider
      value={{
        shipping,
        setShipping,
        billing,
        setBilling,
        shippingRate,
        isFetching,
        isCheckingOut,
        setCheckingOut,
        showEstimate,
        setSameAsBilling,
        paymentMethod,
        setPaymentMethod,
        availabilityConflict,
        quantityConflict,
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
