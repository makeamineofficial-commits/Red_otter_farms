"use client";

import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";

type RecipeCardProps = {
  title?: string;
  description?: string;
  time?: string;
  servings?: string;
  difficulty?: "Easy" | "Medium";
};

const STATIC_RECIPE = {
  title: "Mediterranean Veggie Bowl",
  description:
    "A fresh and healthy mix of vegetables with olive oil, lemon, and herbs.",
  time: "25 mins",
  servings: "2 servings",
  difficulty: "Easy" as const,
};

export function RecipeCard({
  title = STATIC_RECIPE.title,
  description = STATIC_RECIPE.description,
  time = STATIC_RECIPE.time,
  servings = STATIC_RECIPE.servings,
  difficulty = STATIC_RECIPE.difficulty,
}: RecipeCardProps) {
  const { category } = useParams();
  const router = useRouter();

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const href = category ? `/recipes/${category}/${slug}` : `/recipes/${slug}`;

  return (
    <div className="overflow-hidden bg-white rounded-2xl border hover:shadow-md transition-all duration-200">
      {/* Image Placeholder */}
      <div className="relative aspect-video bg-muted">
        <Badge className="absolute right-3 top-3 rounded-full bg-white text-black">
          {difficulty}
        </Badge>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-green-500" />
              {time}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4 text-green-500" />
              {servings}
            </span>
          </div>
        </div>

        <Button
          onClick={() => router.push(href)}
          className="w-full rounded-xl bg-green-600 hover:bg-green-700"
        >
          View Recipe
        </Button>
      </div>
    </div>
  );
}
