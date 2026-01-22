"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import RecipeHero from "@/components/user/recipe/hero";
import Ingredients from "@/components/user/recipe/ingredient";
import NutritionFacts from "@/components/user/recipe/nutritionFacts";
import Instructions from "@/components/user/recipe/instructions";
import ChefTips from "@/components/user/recipe/chefTips";
import YouMayLikeIt from "@/components/user/recipe/youMayLikeIt";
import Image from "next/image";
// This component intentionally excludes the page header + hero recipe card
// It represents the "rest" of the UI below the main card

export default function page() {
  return (
    <section className="bg-mint">
      <div className="w-full pt-45 relative">
        <div className="sticky top-45">
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent z-30" />
          <div className="relative w-full h-140 aspect-video">
            <Image
              src="/home/hero.png"
              alt="Mediterranean Veggie Salad Bowl"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <article className=" px-4 md:px-12 lg:px-18 pb-5 max-w-400 w-full m-auto space-y-10 ">
        <RecipeHero></RecipeHero>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Ingredients></Ingredients>
            <NutritionFacts></NutritionFacts>
          </div>
          <div className="lg:col-span-3 space-y-6 bg-white shadow-lg p-6 rounded-2xl">
            <Instructions></Instructions>
            <ChefTips></ChefTips>
          </div>
        </div>

        <Separator />

        <YouMayLikeIt></YouMayLikeIt>
      </article>
    </section>
  );
}
