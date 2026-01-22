import z from "zod";
import { Asset, AssetType } from "./common";

export interface ProductPropsBase {
  name: string;
  displayName: string;
  sku: string;

  healthBenefits: string[];
  type: string;
  description?: string;
  quantity: number;
  mrp: number;
  price: number;

  weight?: number;
  weightUnit: string;

  height?: number;
  width?: number;
  breadth?: number;
  dimension: string;

  servingSize?: number;
  servingUnit: string;

  nutritionalInfo: Record<string, number>;
  assets: Asset[];

  inStock: boolean;
  isPublished: boolean;
  isFeatured: boolean;
}

export interface ProductProps extends ProductPropsBase {
  categories: string[];
}

export interface Product extends ProductPropsBase {
  publicId: string;
  slug: string;
  categories: {
    publicId: string;
    slug: string;
    name: string;
  }[];
}
