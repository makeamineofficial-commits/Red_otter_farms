"use client";

import { Star, ChefHat, Share2 } from "lucide-react";

export default function HeroSkeleton() {
  return (
    <article className="w-full xl:min-w-150 space-y-4 animate-pulse">
      {/* Category */}
      <div className="h-4 w-24 bg-gray-300 rounded" />

      {/* Nutrition */}
      <div className="h-6 w-40 bg-gray-300 rounded" />

      {/* Title */}
      <div className="h-10 w-full max-w-[400px] bg-gray-300 rounded" />

      {/* Description */}
      <div className="h-5 w-full max-w-[350px] bg-gray-300 rounded" />

      {/* Price */}
      <div className="mt-4 flex items-center gap-4">
        <div className="h-8 w-16 bg-gray-300 rounded" />
        <div className="h-6 w-12 bg-gray-300 rounded" />
      </div>

      {/* Benefit Placeholder */}
      <div className="h-10 w-full bg-gray-200 rounded mt-4" />

      {/* Count + Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
        <div className="h-14 w-full sm:w-24 bg-gray-300 rounded" />
        <div className="h-14 w-full sm:flex-1 bg-gray-300 rounded" />
      </div>

      {/* Subscribe Button */}
      <div className="h-14 w-full bg-gray-300 rounded mt-3" />

      {/* Loyalty Reward */}
      <div className="bg-gray-200 flex items-center gap-3 p-3 rounded-md mt-3">
        <div className="h-8 w-8 bg-gray-300 rounded-full" />
        <div className="flex flex-col gap-1 w-full">
          <div className="h-3 w-20 bg-gray-300 rounded" />
          <div className="h-2 w-32 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Recipe Ideas */}
      <div className="border-2 border-gray-300 p-3 rounded-md mt-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-5 bg-gray-300 rounded-full" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>
        <ul className="flex flex-col gap-2 mt-2">
          <li className="h-3 w-32 bg-gray-300 rounded" />
          <li className="h-3 w-40 bg-gray-300 rounded" />
          <li className="h-3 w-36 bg-gray-300 rounded" />
        </ul>
      </div>

      {/* Best For */}
      <div className="h-4 w-full max-w-[400px] bg-gray-300 rounded mt-3" />

      {/* Share Section */}
      <div className="flex items-center gap-2 mt-4">
        <div className="h-5 w-5 bg-gray-300 rounded-full" />
        <div className="h-4 w-40 bg-gray-300 rounded" />
      </div>
    </article>
  );
}
