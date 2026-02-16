import { OrderStatus } from "@/lib/db";
import { BillingDetails, ShippingDetails } from "./payment";
import { Asset } from "./common";

export interface Order {
  id: string;
  userIdentifier: string;
  shipping: ShippingDetails;
  billing: BillingDetails;
  sessionId: string;
  paymentId: string | undefined;
  status: OrderStatus;

  discount: number;
  netTotal: number;
  subTotal: number;
  total: number;
  shippingFee: number;

  items: {
    variant: {
      sku: string;
      price: number;
      publicId: string;
      options: string[];
    };
    product: {
      displayName: string;
      summary: string;
      nutritionalInfo: any;
      assets: Asset[];
      slug: string;
    };
    quantity: number;
  }[];
}
