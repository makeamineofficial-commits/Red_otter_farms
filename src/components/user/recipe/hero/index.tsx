"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, Flame, Users, BarChart3, Heart, Share2 } from "lucide-react";

export default function RecipeHero() {
  return (
    <section className=" -mt-85 md:-mt-55 relative space-y-5">
      <div className="text-white z-30 ">
        <div className="max-w-4xl space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-500/90 py-1.5! px-3! hover:bg-green-500">
              Vegetarian
            </Badge>
            <Badge className="bg-green-500/90 py-1.5! px-3! hover:bg-green-500">
              Gluten-Free
            </Badge>
            <Badge className="bg-green-500/90 py-1.5! px-3! hover:bg-green-500">
              Quick & Easy
            </Badge>
            <Badge className="bg-green-500/90 py-1.5! px-3! hover:bg-green-500">
              Healthy
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight">
            Mediterranean Veggie Salad Bowl
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-sm text-white/90">
            A vibrant and nutritious salad featuring fresh vegetables, creamy
            feta cheese, and a zesty lemon dressing. Packed with vitamins,
            minerals, and antioxidants.
          </p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="mx-auto   rounded-2xl p-6 gap-10 shadow-lg relative z-30">
        <div className="flex flex-col gap-6  md:justify-between">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <InfoItem icon={<Clock />} label="Prep Time" value="10 min" />
            <InfoItem icon={<Flame />} label="Cook Time" value="15 min" />
            <InfoItem icon={<Users />} label="Servings" value="4" />
            <InfoItem icon={<BarChart3 />} label="Difficulty" value="Easy" />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Heart className="h-4 w-4" />
              Save Recipe
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
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
      <div className="rounded-full bg-green-100 p-2 text-green-600">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
