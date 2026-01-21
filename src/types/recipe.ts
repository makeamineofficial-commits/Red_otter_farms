import { Asset, AssetType } from "./common";

export interface RecipePropsBase {
  title: string;
  summary: string;
  ingredients: string[];
  chefTips: string[];
  instructions: string[];
  nutritionalInfo?: any;
  assets: Asset[];
  isPublished: boolean;
}

export interface RecipeProps extends RecipePropsBase {
  linkedProducts: { publicId: string; quantity: number }[];
}
export interface Recipe extends RecipePropsBase {
  publicId: string;
  slug: string;

  linkedProducts: {
    name: string;
    publicId: string;
    assets: Asset[];
  }[];
}
