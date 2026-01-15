import { JWTPayload } from "@/types/common";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function generateJWT(payload: any, expireIn?: string) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expireIn ? expireIn : "15m")
    .sign(secret);
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);

    return {
      valid: true,
      payload,
    };
  } catch (err) {
    return {
      valid: false,
      payload: null,
    };
  }
}

export const validateToken = async (
  token?: string
): Promise<JWTPayload | null> => {
  if (!token) return null;

  const result = await verifyJWT(token);
  if (!result.valid) return null;

  return result.payload as JWTPayload;
};
