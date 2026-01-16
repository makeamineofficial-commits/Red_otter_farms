export interface CollectionProps {
  name: string;
  displayName: string;
  description?: string;
  isPublished: boolean;
}

export interface Collection {
  publicId: string;
  name: string;
  slug: string;
  displayName: string;
  description?: string;
  isPublished: boolean;
}
