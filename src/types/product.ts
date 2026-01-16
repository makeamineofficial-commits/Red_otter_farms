import { AssetType } from "./common";

export interface ProductProps {
  name: string;
  displayName: string;
  sku: string;
  collections: string[];
  healthBenefits: string[];
  type: string;
  description?: string;

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

  calories?: number;
  protein?: number;
  fiber?: number;
  fat?: number;
  carbs?: number;
  sugar?: number;
  potassium?: number;
  sodium?: number;

  assets: {
    url: string;
    thumbnail: string;
    position: number;
    isPrimary: boolean;
    type: AssetType;
  }[];

  inStock: boolean;
  isPublished: boolean;
  isFeatured: boolean;
}

export interface Product {
  publicId: string;
  name: string;
  displayName: string;
  sku: string;
  collections: { publicId: string; name: string; slug: string }[];
  healthBenefits: string[];
  type: string;
  description?: string;

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

  calories?: number;
  protein?: number;
  fiber?: number;
  fat?: number;
  carbs?: number;
  sugar?: number;
  potassium?: number;
  sodium?: number;

  assets: {
    url: string;
    thumbnail: string;
    position: number;
    isPrimary: boolean;
    type: AssetType;
  }[];

  inStock: boolean;
  isPublished: boolean;
  isFeatured: boolean;
}
