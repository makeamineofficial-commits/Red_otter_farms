"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function RecipeCardLoader() {
  return (
    <div className="overflow-hidden bg-white rounded-2xl border">
      {/* Image skeleton */}
      <div className="relative aspect-video">
        <Skeleton className="absolute inset-0" />
        <Skeleton className="absolute right-3 top-3 h-6 w-20 rounded-full" />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          <div className="flex gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}
