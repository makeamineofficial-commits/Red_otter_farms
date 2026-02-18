import { Asset } from "./common";

export interface ProductPropsBase {
  // about
  name: string;
  displayName: string;
  summary: string;
  description: string;
  healthBenefits: string[];
  type: string;
  assets: Asset[];

  nutritionalInfo?: Record<string, number>;
  isFeatured: boolean;
  isPublished: boolean;
  isDryStore: boolean;
  hasSubscription: boolean;
  faqs: { question: string; answer: string }[];
  minPrice: number;
  maxPrice: number;
}

export interface ProductProps extends ProductPropsBase {
  categories: string[];
  options: {
    displayName: string;
    values: { displayName: string; isDefault: boolean }[];
  }[];
}

export interface Product extends ProductPropsBase {
  publicId: string;
  slug: string;
  presentInWishlist: boolean;
  categories: {
    publicId: string;
    slug: string;
    name: string;
  }[];
  options: {
    displayName: string;
    slug: string;
    values: {
      displayName: string;
      slug: string;
      isDefault: boolean;
    }[];
  }[];
}

export interface ProductPreview {
  displayName: string;
  summary: string;
  presentInWishlist: boolean;
  slug: string;
  nutritionalInfo?: any;
  healthBenefits: string[];
  assets: Asset[];
  variantId: string;
  productId: string;
  variants: number;
  type: string;
  // default variant
  sku: string;
  mrp: number;
  price: number;
  variantOption: string[];
  inStock: boolean;
  hasSubscription: boolean;
  stockLimit: number;
  availableInStock: number;
}

export enum SortBy {
  BEST_SELLING = "best-selling",
  PRICE_LOW = "price-low",
  PRICE_HIGH = "price-high",
  LATEST = "latest",
  NONE = "all",
}

export interface VariantProps {
  sku: string;

  // about
  name: string;

  // availability
  availableInStock: number;
  stockLimit: number;
  inStock: boolean;

  // pricing
  mrp: number;
  price: number;

  // weight and dimension  (For Shipping)
  weight?: number;
  weightUnit: string;
  length?: number;
  lengthUnit: string;
  breadth?: number;
  breadthUnit: string;
  height?: number;
  heightUnit: string;

  // visibility
  isPublished: boolean;
  isDefault: boolean;
  options: { option: string; optionValue: string }[];
}

export interface Variant extends VariantProps {
  publicId: string;
}

export interface ProductOption {
  displayName: string;
  slug: string;
  values: {
    displayName: string;
    slug: string;
    isDefault: boolean;
  }[];
}

export interface VariantOption {
  option: string;
  optionValue: string;
}

export const loyaltyDiscount: Record<string, number> = {
  access: 0.95,
  privy: 0.9,
  signature: 0.85,
  none: 1,
};
