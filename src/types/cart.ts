import { Asset } from "./common";
import { Product, Variant } from "./product";

export interface Cart {
  sessionId: string;
  status: string;
  items: CartItem[];
}

export interface Item {
  variant: {
    sku: string;
    price: number;
    publicId: string;
  };
  product: {
    displayName: string;
    summary: string;
    nutritionalInfo: any;
    assets: Asset[];
    slug: string;
  };
}
export interface CartItem extends Item {
  quantity: number;
}
