export interface CollectionProps {
  name: string;
  displayName: string;
  description?: string;
  isPublished: boolean;
}

export interface Collection {
  publicId: string;
  name: string;
  displayName: string;
  description?: string;
  slug: string;
  isPublished: boolean;
}
