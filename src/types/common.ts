export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  total: number;
  prev: number | null;
  next: number | null;
  totalPages: number;
  data: T[];
}

export enum AssetType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}
export type PreviewFile = {
  url: string;
  thumbnail?: string;
  type: AssetType;
  isPrimary: boolean;
  position: number;
};

export type Asset = {
  url: string;
  thumbnail: string;
  position: number;
  isPrimary: boolean;
  type: any;
};

// shiprocket.types.ts

export type ShiprocketOrderItem = {
  name: string;
  sku: string;
  units: number;
  selling_price: number;
  discount?: number;
  tax?: number;
  hsn?: number;
  weight: number; // in grams
};

export type ShiprocketAddress = {
  customer_name: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  email: string;
  phone: string;
};

export type ShiprocketCreateOrderInput = {
  order_id: string;
  order_date: string;
  pickup_location: string;

  billing: ShiprocketAddress;

  shipping?: ShiprocketAddress;

  shipping_is_billing: boolean;

  order_items: ShiprocketOrderItem[];

  payment_method: "Prepaid" | "COD";

  shipping_charges?: number;
  giftwrap_charges?: number;
  transaction_charges?: number;

  length: number;
  breadth: number;
  height: number;
  weight: number;
};

export type ShiprocketOrderResponse = {
  order_id: number;
  shipment_id: number;
  status: string;
  awb_code?: string;
};
