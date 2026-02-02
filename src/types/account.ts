export interface Account {
  customer_id: string;
  first_name: string;
  last_name: string;

  billing_address: Address;
  shipping_address: ShippingAddress;
  addresses: Address[];

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
  street2: string;
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
  customer_id: string;
}

type AddressLabel = "home" | "work" | "custom";
export interface AddressProps {
  street: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  labelType: AddressLabel;
  customLabel?: string;
}
