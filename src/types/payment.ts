export interface BillingDetails {
  addressId: string | null;
  phone: string;

  firstName: string;
  lastName: string;
  email?: string;

  street: string;
  address: string;
  city: string;
  zip: string;

  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
}

export interface ShippingDetails {
  addressId: string | null;
  firstName?: string;
  lastName?: string;
  phone?: string;

  street: string;
  address: string;
  city: string;
  zip: string;

  state: string;
  stateCode: string;
  country: string;
  countryCode: string;

  notes?: string;
  courier?: string;
}

export enum PaymentMethod {
  RAZORPAY = "RAZORPAY",
  OTTER = "OTTER",
  SPLIT = "SPLIT",
}
