"use server";
import { validateUser } from "@/actions/auth/user.action";
import { Account } from "@/types/account";
import axios from "axios";

interface FeedbackProps {
  email: string;
  subject: string;
  body: string;
}

export async function feedback(data: FeedbackProps) {
  try {
    // const res = await axios.post(
    //   "https://automation.redotterfarms.com/webhook/0b38de6f-5560-4396-8204-a1874e419a2d",
    //   data,
    //   {
    //     headers: { api_key: process.env.BACKEND_API_KEY as string },
    //   },
    // );
    console.log("feedback called");
    return {
      success: true,
      message: "Feedback sent",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to sent feedback",
    };
  }
}
