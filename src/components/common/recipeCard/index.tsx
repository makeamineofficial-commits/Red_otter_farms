"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Clock, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Recipe } from "@/types/recipe";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

export function RecipeCard({
  title,
  slug,
  difficulty,
  summary,
  cookingTime,
  serving,
  assets,
}: Recipe) {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="overflow-hidden relative bg-white rounded-2xl border hover:shadow-md transition-all">
      <Link
        href={`/recipe/${slug}`}
        className="absolute top-0 left-0  h-full w-full  z-10 "
      ></Link>

      <div className="relative aspect-video min-h-60 bg-muted">
        <Image src={assets[0].url} alt={title} fill className="object-cover" />

        <Badge className="absolute right-3 top-3 rounded-full bg-white text-black">
          {difficulty}
        </Badge>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {summary}
          </p>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-forest" />
              {cookingTime}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4 text-forest" />
              {serving}
            </span>
          </div>
        </div>

        <Button className="w-full rounded-xl bg-forest hover:bg-forest">
          View Recipe
        </Button>
      </div>
    </div>
  );
}
