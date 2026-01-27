import crypto from "crypto";
import { db } from "@/lib/db";

const SECRET = process.env.OTP_SECRET as string;
const OTP_TTL_MS = 5 * 60 * 1000;

function generateOTP(phone: string): string {
  const timestamp = Math.floor(Date.now() / OTP_TTL_MS);
  const hmac = crypto
    .createHmac("sha256", SECRET)
    .update(`${phone}:${timestamp}`)
    .digest("hex");

  return (parseInt(hmac.slice(-6), 16) % 1_000_000).toString().padStart(6, "0");
}
export async function sendOTP({
  phone,
  type = "mobile",
}: {
  phone: string;
  type?: string;
}): Promise<string> {
  console.log("[OTP] sendOTP called", { phone, type });

  if (!process.env.OTP_SECRET) {
    console.error("[OTP] OTP_SECRET missing");
    throw new Error("Server misconfiguration");
  }

  if (!process.env.BACKEND_API_KEY) {
    console.error("[OTP] BACKEND_API_KEY missing");
    throw new Error("Server misconfiguration");
  }

  // ---- DB PART (ONLY DB) ----
  const otp = await db.$transaction(async (tx) => {
    const existing = await tx.userOTP.findUnique({ where: { phone } });

    if (existing) {
      const age = Date.now() - existing.createdAt.getTime();
      if (age < OTP_TTL_MS) {
        const retryAfter = Math.ceil((OTP_TTL_MS - age) / 1000);
        console.warn("[OTP] Retry too soon", { phone, retryAfter });
        throw new Error(`Please try again after ${retryAfter} seconds`);
      }
      await tx.userOTP.delete({ where: { id: existing.id } });
    }

    const otp = generateOTP(phone);

    await tx.userOTP.create({
      data: { phone, otp },
    });

    return otp;
  });

  try {
    const url = `https://automation.redotterfarms.com/webhook/74bbc36f-88f5-4315-9530-986b3fe60a71?type=${type}`;

    console.log("[OTP] Sending OTP webhook", {
      url,
      phone: "+91" + phone,
    });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_key: process.env.BACKEND_API_KEY!,
      },
      body: JSON.stringify({
        mobile: "+91" + phone,
        otp,
      }),
    });

    const responseText = await res.text();

    if (!res.ok) {
      console.error("[OTP] Webhook failed", {
        status: res.status,
        body: responseText,
      });
      throw new Error("Failed to send OTP");
    }

    console.log("[OTP] OTP sent successfully", responseText);
    return otp;
  } catch (err) {
    console.error("[OTP] Fetch exception", err);
    throw err;
  }
}

export async function verifyOTP(submittedOTP: string): Promise<string> {
  return await db.$transaction(async (tx) => {
    const record = await tx.userOTP.findUnique({
      where: { otp: submittedOTP },
    });

    if (!record) throw new Error("OTP didn't matched! Please try again");

    const now = new Date();
    const age = now.getTime() - record.createdAt.getTime();
    if (age > OTP_TTL_MS) {
      await tx.userOTP.delete({ where: { id: record.id } });
      throw new Error("OTP has expired! Please re-login to continue");
    }
    await tx.userOTP.delete({ where: { id: record.id } });
    const expectedOTP = generateOTP(record.phone);
    if (expectedOTP !== submittedOTP) throw new Error("OTP didn't matched");

    return record.phone;
  });
}
