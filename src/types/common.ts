export type JWTPayload = {
  id: string;
  name?: string;
  email?: string;
};

export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  prev: number | null;
  next: number | null;
  total: number;
  totalPages: number;
  data: T[];
}

export enum AssetType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}
