import { CartProduct } from "./cart";
import { Asset, AssetType } from "./common";

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

export interface RecipeProps extends RecipePropsBase {
  linkedProducts: { publicId: string; quantity: number }[];
}
export interface Recipe extends RecipePropsBase {
  publicId: string;
  slug: string;

  linkedProducts: CartProduct[];
}
