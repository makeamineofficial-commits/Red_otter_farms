"use server";

import axios from "axios";

export const subscribeForNewsletter = async (data: {
  email: string;
  mobile?: string;
}) => {
  try {
    const res = await axios.post(
      "https://automation.redotterfarms.com/webhook/f7526498-71fd-420e-8bd2-f1434fed54f8",
      { ...data },
      {
        headers: { api_key: process.env.BACKEND_API_KEY as string },
      },
    );

    return { success: true, message: "Subscribed successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to subscribe for newsletter" };
  }
};
