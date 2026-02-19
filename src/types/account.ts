export interface Account {
  customer_id: string;
  first_name: string;
  last_name: string;

  phone: string;
  mobile: string;

  otter_wallet: string | number | null;
  total_saving: string | number | null;
  loyality_status: string | null;

  otter_pass: boolean;
  nutrition_meter: boolean;
  otter_n: boolean;
}

export interface Address extends AddressProps {
  publicId: string;
  userIdentifier: string;
  state: string;
  country: string;
}

export interface ListAddressReturnType {
  shippingAddress: Address | null;
  billingAddress: Address | null;
  addresses: Address[];
}

export type AddressLabel = "HOME" | "WORK" | "CUSTOM";
export type AddressTag = "BILLING" | "SHIPPING" | "NONE";
export interface AddressProps {
  address: string;
  street: string;
  city: string;
  stateCode: string;
  countryCode: string;
  zip: string;
  attention?: string;
  label: AddressLabel;
  customLabel?: string;
  tag: AddressTag;
}

export const states = [
  { name: "Andhra Pradesh", code: "AP" },
  { name: "Arunachal Pradesh", code: "AR" },
  { name: "Assam", code: "AS" },
  { name: "Bihar", code: "BR" },
  { name: "Chhattisgarh", code: "CG" },
  { name: "Goa", code: "GA" },
  { name: "Gujarat", code: "GJ" },
  { name: "Haryana", code: "HR" },
  { name: "Himachal Pradesh", code: "HP" },
  { name: "Jharkhand", code: "JH" },
  { name: "Karnataka", code: "KA" },
  { name: "Kerala", code: "KL" },
  { name: "Madhya Pradesh", code: "MP" },
  { name: "Maharashtra", code: "MH" },
  { name: "Manipur", code: "MN" },
  { name: "Meghalaya", code: "ML" },
  { name: "Mizoram", code: "MZ" },
  { name: "Nagaland", code: "NL" },
  { name: "Odisha", code: "OD" },
  { name: "Punjab", code: "PB" },
  { name: "Rajasthan", code: "RJ" },
  { name: "Sikkim", code: "SK" },
  { name: "Tamil Nadu", code: "TN" },
  { name: "Telangana", code: "TS" },
  { name: "Tripura", code: "TR" },
  { name: "Uttar Pradesh", code: "UP" },
  { name: "Uttarakhand", code: "UK" },
  { name: "West Bengal", code: "WB" },

  { name: "Andaman and Nicobar Islands", code: "AN" },
  { name: "Chandigarh", code: "CH" },
  { name: "Dadra and Nagar Haveli and Daman and Diu", code: "DN" },
  { name: "Delhi", code: "DL" },
  { name: "Jammu and Kashmir", code: "JK" },
  { name: "Ladakh", code: "LA" },
  { name: "Lakshadweep", code: "LD" },
  { name: "Puducherry", code: "PY" },
];

export const AddressLabels = [
  { value: "HOME", label: "Home" },
  { value: "WORK", label: "Work" },
  { value: "CUSTOM", label: "Other" },
];

export const AddressTags = [
  { value: "BILLING", label: "Billing" },
  { value: "SHIPPING", label: "Shipping" },
  { value: "NONE", label: "None" },
];
