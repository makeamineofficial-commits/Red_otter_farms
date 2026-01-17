import { AssetType } from "./common";

export interface PostProps {
  title: string;
  summary: string;
  contentHTML: string;
  sharableLink: string;
  assets: {
    url: string;
    thumbnail: string;
    type: AssetType;
  }[];
  isPublished: boolean;
}

export interface Post extends PostProps {
  publicId: string;
  slug: string;
}
