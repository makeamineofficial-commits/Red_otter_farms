export type JWTPayload = {
  id: string;
  name?: string;
  email?: string;
};
export interface PaginatedResponse {
  page: number;
  limit: number;
  prev: number | null;
  next: number | null;
  total: number;
  totalPages: number;
}
