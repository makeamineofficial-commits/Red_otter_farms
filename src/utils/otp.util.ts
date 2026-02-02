import { db } from "@/lib/db";

export async function sendOTP({
  phone,
  type = "mobile",
}: {
  phone: string;
  type?: string;
}): Promise<string | null> {
  console.log("[OTP] sendOTP called", { phone, type });

  const otp = await db.$transaction(async (tx) => {
    await tx.userOTP.deleteMany({ where: { phone } });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await tx.userOTP.create({
      data: { phone, otp },
    });
    return otp;
  });
  console.log("[OTP] OTP added", { otp });
  try {
    // const url = `https://automation.redotterfarms.com/webhook/74bbc36f-88f5-4315-9530-986b3fe60a71?type=${type}`;

    // console.log("[OTP] Sending OTP webhook", {
    //   url,
    //   phone: "+91" + phone,
    // });

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     api_key: process.env.BACKEND_API_KEY!,
    //   },
    //   body: JSON.stringify({
    //     mobile: "+91" + phone,
    //     otp,
    //   }),
    // });

    // const responseText = await res.text();

    // if (!res.ok) {
    //   console.error("[OTP] Webhook failed", {
    //     status: res.status,
    //     body: responseText,
    //   });
    //   throw new Error("Failed to send OTP");
    // }
    if (process.env.NODE_ENV === "development") console.log("[OTP]", otp);
    return otp;
  } catch (err) {
    console.error("[OTP] Fetch exception", err);
    throw err;
  }
}

export async function verifyOTP(submittedOTP: string) {
  return await db.$transaction(async (tx) => {
    const record = await tx.userOTP.findUnique({
      where: { otp: submittedOTP },
    });

    if (!record)
      return {
        message: "OTP didn't matched! Please try again",
        success: false,
      };

    await tx.userOTP.delete({ where: { id: record.id } });

    return {
      message: "OTP verified",
      success: true,
      phone: record.phone,
    };
  });
}
