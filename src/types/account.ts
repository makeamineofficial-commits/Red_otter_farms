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

export interface Address {
  address_id: string;
  attention: string;
  address: string;
  street: string;
  city: string;
  state: string;
  state_code: string;
  zip: string;
  country: string;
  county: string;
  country_code: string;
  phone: string;
  fax: string;
  tax_info_id?: string;
  tag: AddressTag;
  label: any | null;
  customLabel: string | null;
}

export interface ShippingAddress extends Address {
  latitude: string;
  longitude: string;
  phone_formatted: string;
}

export interface ListAddressReturnType {
  billing_address: Address;
  shipping_address: ShippingAddress;
  addresses: Address[];
}

export type AddressLabel = "HOME" | "WORK" | "CUSTOM";
export type AddressTag = "BILLING" | "SHIPPING" | "NONE";
export interface AddressProps {
  street: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  attention: string;
  labelType: AddressLabel;
  customLabel?: string;
  tag: AddressTag;
}
