"use client";

import { useHomeStore } from "@/store/user/home.store";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Reel } from "@/types/home";

const isVideo = (url: string) => {
  return (
    url.endsWith(".mp4") ||
    url.endsWith(".webm") ||
    url.includes("video") ||
    url.includes("mp4")
  );
};

export default function Social() {
  const { data, isLoading } = useHomeStore();

  if (isLoading) return null;
  if (!data?.reels?.length) return null;

  return (
    <section className="bg-forest px-4 md:px-12 lg:px-18 py-20 overflow-hidden">
      {/* Header */}
      <article className="flex justify-between items-center mb-12 ">
        <h2 className="font-dream-orphans text-white text-[2rem] lg:text-[3.5rem] 2xl:text-[4.75rem] uppercase">
          From the 'gram
        </h2>

        <Link
          href="https://www.instagram.com/redotterfarms/"
          target="_blank"
          className="uppercase gap-4 flex items-center px-3 py-3 lg:px-10 lg:py-4 text-[1.25rem] font-semibold bg-white text-red-500 hover:bg-white rounded-lg lg:rounded-2xl"
        >
          <Instagram className="stroke-red-500 size-6" />
          <span className="hidden lg:block">Follow Us @redotterfarms</span>
        </Link>
      </article>

      {/* Marquee */}
      <div className="relative">
        <div className="animate-marquee flex gap-8">
          {data.reels.map((reel: Reel) => (
            <Link
              key={reel.id}
              href={reel.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <div className="relative aspect-3/4 w-60 md:w-80 xl:w-120 shrink-0 overflow-hidden ">
                {/* VIDEO */}
                {isVideo(reel.media_url) ? (
                  <video
                    src={reel.media_url}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  /* IMAGE */
                  <Image
                    src={reel.media_url}
                    alt={reel.caption || "Instagram post"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 240px, 320px"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
