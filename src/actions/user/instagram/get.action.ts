"use server";
import { DEMO_REELS, Reel } from "@/types/home";
export async function getInstagramReels() {
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
  const IG_USER_ID = process.env.INSTAGRAM_USER_ID;

  if (!ACCESS_TOKEN || !IG_USER_ID) {
    console.warn("Missing Instagram credentials! Showing demo reels");
    return DEMO_REELS;
  }

  const url = `https://graph.facebook.com/v19.0/${IG_USER_ID}/media?fields=id,media_type,media_url,permalink,caption,timestamp&access_token=${ACCESS_TOKEN}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  const data = await res.json();

  // Filter only reels/videos
  const reels: Reel[] = data.data.filter(
    (item: any) => item.media_type === "REELS" || item.media_type === "VIDEO",
  );

  return reels;
}
