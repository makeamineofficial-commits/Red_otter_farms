"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, Flame, Users, BarChart3, Heart, Share2 } from "lucide-react";
import { Recipe } from "@/types/recipe";
import RecipeBreadcrumb from "../breadcrumb";
import { Share } from "@/components/common/share";
export default function RecipeHero({
  cookingTime,
  difficulty,
  serving,
  prepTime,
  title,
  summary,
}: Recipe) {
  return (
    <section className=" -mt-60 md:-mt-55 relative space-y-5">
      <div className="text-white z-30 ">
        <div className="max-w-4xl space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-forest/90 py-1.5! px-3! hover:bg-forest">
              Vegetarian
            </Badge>
            <Badge className="bg-forest/90 py-1.5! px-3! hover:bg-forest">
              Gluten-Free
            </Badge>
            <Badge className="bg-forest/90 py-1.5! px-3! hover:bg-forest">
              Quick & Easy
            </Badge>
            <Badge className="bg-forest/90 py-1.5! px-3! hover:bg-forest">
              Healthy
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>

          {/* Description */}
          <p className="max-w-2xl text-sm text-white/90">{summary}</p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="mx-auto   rounded-2xl p-6 gap-10 shadow-lg relative z-30">
        <div className="flex flex-col gap-6  md:justify-between">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <InfoItem icon={<Clock />} label="Prep Time" value={prepTime} />
            <InfoItem icon={<Flame />} label="Cook Time" value={cookingTime} />
            <InfoItem icon={<Users />} label="Servings" value={serving} />
            <InfoItem
              icon={<BarChart3 />}
              label="Difficulty"
              value={difficulty}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Heart className="h-4 w-4" />
              Save Recipe
            </Button>
            <Share>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </Share>
          </div>
        </div>
      </Card>
    </section>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full bg-forest/10 p-2 text-forest/60">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
