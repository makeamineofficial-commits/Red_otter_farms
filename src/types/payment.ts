export interface BillingDetails {
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

  createAccount: boolean;
}

export interface ShippingDetails {
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
