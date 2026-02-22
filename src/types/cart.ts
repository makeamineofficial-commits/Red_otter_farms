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
    availableInStock: number;
    publicId: string;
    options: string[];
  };
  product: {
    displayName: string;
    summary: string;
    nutritionalInfo: any;
    isDrystore: boolean;
    hasSubscription: boolean;
    assets: Asset[];
    slug: string;
  };
}
export interface CartItem extends Item {
  quantity: number;
}
