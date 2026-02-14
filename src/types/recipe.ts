import { CartItem } from "./cart";
import { Asset, AssetType } from "./common";
import { Product, Variant } from "./product";

export interface RecipePropsBase {
  title: string;
  summary: string;
  ingredients: string[];
  chefTips: string[];
  instructions: string[];
  tags: string[];
  nutritionalInfo?: any;
  assets: Asset[];
  isPublished: boolean;
  healthBenefits: string[];
  cookingTime: string;
  difficulty: string;
  serving: string;
  prepTime: string;
}

export interface ListedIngredients {
  quantity: number;
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

export interface RecipePreview {
  slug: string;
  title: string;
  summary: string;
  cookingTime: string;
  serving: string;
  difficulty: string;
  assets: Asset[];
}

export interface RecipeProps extends RecipePropsBase {
  listedIngredients: { publicId: string; quantity: number }[];
}
export interface Recipe extends RecipePropsBase {
  publicId: string;
  slug: string;
  listedIngredients: ListedIngredients[];
}
