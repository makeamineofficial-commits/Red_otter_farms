export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  total: number;
  prev: number | null;
  next: number | null;
  totalPages: number;
  data: T[];
}

export enum AssetType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}
export type PreviewFile = {
  url: string;
  thumbnail?: string;
  type: AssetType;
  isPrimary: boolean;
  position: number;
};

export type Asset = {
  url: string;
  thumbnail: string;
  position: number;
  isPrimary: boolean;
  type: any;
};
