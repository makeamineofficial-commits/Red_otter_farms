import { AssetType } from "./common";

export interface Cart {
  sessionId: string;
  status: string;
  products: CartProduct[];
}

export interface CartProduct {
  publicId: string;
  quantity: number;
  price: number;
  displayName: string;
  description?: string | null;
  nutritionalInfo: any;

  assets: {
    url: string;
    type: any;
  }[];
}
