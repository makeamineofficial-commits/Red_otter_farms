export interface CategoryProps {
  name: string;
  displayName: string;
  description?: string;
  isPublished: boolean;
}

export interface Category {
  publicId: string;
  name: string;
  displayName: string;
  description?: string;
  slug: string;
  isPublished: boolean;
}
