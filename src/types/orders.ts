type Address = {
  fax: string;
  zip: string;
  city: string;
  phone: string;
  state: string;
  county: string;
  address: string;
  country: string;
  street2: string;
  attention: string;
  state_code: string;
  country_code: string;
  company_name?: string; // Only in shipping_address
};

type LineItem = {
  sku: string;
  quantity: number;
};

type SalesOrder = {
  salesorder_id: string;
  salesorder_number: string;
  customer_id: string;
  customer_name: string;

  discount: string;
  sub_total: string;
  shipping_charge: string;
  total: string;

  status: "confirmed" | "pending" | "shipped" | "cancelled";

  shipment_date: string;
  created_date: string;

  billing_address: Address;
  shipping_address: Address;

  line_items: LineItem[];
};
