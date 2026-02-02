"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import RecipeHero from "@/components/user/recipe/hero";
import Ingredients from "@/components/user/recipe/ingredient";
import NutritionFacts from "@/components/user/recipe/nutritionFacts";
import Instructions from "@/components/user/recipe/instructions";
import ChefTips from "@/components/user/recipe/chefTips";
import YouMayLikeIt from "@/components/user/recipe/youMayLikeIt";
import { RecipeCarousel } from "@/components/user/recipe/recipeCarousel";
import Image from "next/image";
import { useRecipeStore } from "@/store/user/recipe.store";
import { Loader2 } from "lucide-react";
import RecipeBreadcrumb from "@/components/user/recipe/breadcrumb";

export default function page() {
  const { data, isFetching, isLoading } = useRecipeStore();

  if (!data || isFetching || isLoading)
    return (
      <article className=" px-4 md:px-12  lg:px-18 pb-5 max-w-400 w-full m-auto space-y-10 text-center flex justify-center items-center">
        <Loader2 className="animate-spin duration-300 size-10"></Loader2>
      </article>
    );

  return (
    <section className="bg-mint -translate-y-5.5">
      <div className="w-full  relative ">
        <RecipeBreadcrumb></RecipeBreadcrumb>
        <div className="sticky -top-5">
          <RecipeCarousel assets={data.assets} title={data.title} />
        </div>
      </div>
      <article className=" px-4 md:px-12 lg:px-18 pb-5 max-w-400 w-full m-auto space-y-10 ">
        <RecipeHero {...data}></RecipeHero>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Ingredients {...data}></Ingredients>
            <NutritionFacts {...data}></NutritionFacts>
          </div>
          <div className="lg:col-span-3 space-y-6 bg-white shadow-lg p-6 rounded-2xl">
            <Instructions {...data}></Instructions>
            <ChefTips {...data}></ChefTips>
          </div>
        </div>

        <Separator />

        <YouMayLikeIt></YouMayLikeIt>
      </article>
    </section>
  );
}
