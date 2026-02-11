export interface CategoryProps {
  name: string;
  displayName: string;
  description?: string;
  isPublished: boolean;
  quickShop: boolean;
}

export interface Category extends CategoryProps {
  publicId: string;
  slug: string;
}
