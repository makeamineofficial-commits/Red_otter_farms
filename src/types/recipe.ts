import { AssetType } from "./common";

export interface RecipeProps {
  title: string;
  summary: string;
  contentHTML: string;
  sharableLink: string;
  assets: {
    url: string;
    thumbnail: string;
    position: number;
    isPrimary: boolean;
    type: AssetType;
  }[];
  isPublished: boolean;
}

export interface Recipe extends RecipeProps {
  publicId: string;
  slug: string;
}
