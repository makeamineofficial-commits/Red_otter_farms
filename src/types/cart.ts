import { Asset } from "./common";

export interface Cart {
  sessionId: string;
  status: string;
  orderId?: string;
  items: CartItem[];
}

export interface Item {
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
}
export interface CartItem extends Item {
  quantity: number;
}
