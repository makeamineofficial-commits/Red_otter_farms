import { Asset } from "./common";

export interface Cart {
  sessionId: string;
  status: string;
  paymentId?: string;
  shipping?: any;
  billing?: any;
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

export interface CartExtended {
  id: string;
  userIdentifier: string | null;
  sessionId: string;
  status: string;
  paymentId?: string;
  shipping?: any;
  billing?: any;
  items: CartItem[];
}
