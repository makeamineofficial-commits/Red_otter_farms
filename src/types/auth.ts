export interface Token {
  type: "access" | "refresh";
}

export interface AdminToken extends Token {
  id: string;
  name?: string;
  email?: string;
}

export interface UserToken extends Token {
  customerId: string;
  phone: string;
}


