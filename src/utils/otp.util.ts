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
  return await db.$transaction(async (tx) => {
    const existing = await tx.userOTP.findUnique({
      where: { phone },
    });

    if (existing) {
      const age = Date.now() - existing.createdAt.getTime();
      if (age < OTP_TTL_MS) {
        const retryAfter = Math.ceil((OTP_TTL_MS - age) / 1000);
        throw new Error(`Please try again after ${retryAfter} seconds`);
      }
      await tx.userOTP.delete({ where: { id: existing.id } });
    }

    const otp = generateOTP(phone);

    await tx.userOTP.create({
      data: { phone, otp },
    });

    const res = await fetch(
      `https://automation.redotterfarms.com/webhook/74bbc36f-88f5-4315-9530-986b3fe60a71?type=${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_key: process.env.BACKEND_API_KEY as string,
        },
        body: JSON.stringify({ mobile: "+91" + phone, otp }),
      },
    );
    if (!res.ok) {
      throw new Error("Failed to send OTP");
    }

    return otp;
  });
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
