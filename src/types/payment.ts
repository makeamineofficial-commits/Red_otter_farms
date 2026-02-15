export interface BillingDetails {
  phone: string;
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

export enum PaymentMethod {
  RAZORPAY = "RAZORPAY",
  OTTER = "OTTER",
  SPLIT = "SPLIT",
}
