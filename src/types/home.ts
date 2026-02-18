export type Reel = {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  timestamp: string;
};

export const DEMO_REELS: Reel[] = [
  {
    id: "demo-1",
    media_url: "/home/insta-1.webp",
    permalink: "https://www.instagram.com/redotterfarms/",
    caption: "Fresh tomatoes 🍅",
    timestamp: new Date().toISOString(),
  },
  {
    id: "demo-2",
    media_url: "/home/insta-2.webp",
    permalink: "https://www.instagram.com/redotterfarms/",
    caption: "Organic vegetables 🥬",
    timestamp: new Date().toISOString(),
  },
  {
    id: "demo-3",
    media_url: "/home/insta-3.webp",
    permalink: "https://www.instagram.com/redotterfarms/",
    caption: "Farm harvest 🌱",
    timestamp: new Date().toISOString(),
  },

  {
    id: "demo-4",
    media_url: "/home/demo-reel.mp4",
    permalink: "https://www.instagram.com/redotterfarms/",
    caption: "Fresh vegetables being packed 📦",
    timestamp: new Date().toISOString(),
  },

  {
    id: "demo-5",
    media_url: "/home/insta-4.webp",
    permalink: "https://www.instagram.com/redotterfarms/",
    caption: "Organic farming in action 🚜",
    timestamp: new Date().toISOString(),
  },
  {
    id: "demo-6",
    media_url: "/home/demo-reel.mp4",
    permalink: "https://www.instagram.com/redotterfarms/",
    caption: "Greenhouse vegetables 🌿",
    timestamp: new Date().toISOString(),
  },
  {
    id: "demo-7",
    media_url: "/home/insta-6.webp",
    permalink: "https://www.instagram.com/redotterfarms/",
    caption: "Fresh carrots 🥕",
    timestamp: new Date().toISOString(),
  },
];
