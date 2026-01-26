import { AssetType } from "./common";

export interface Cart {
  sessionId: string;
  status: string;
  products: {
    quantity: number;
    price: number;
    displayName: string;
    description: string;
    assets: {
      url: string;
      type: AssetType;
    };
  }[];
}
