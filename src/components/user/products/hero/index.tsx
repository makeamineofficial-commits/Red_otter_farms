"use client";

import { Button } from "@/components/ui/button";
import Count from "./count";
import Nutrition from "./nutrition";
import { ChefHat, Share2, Star } from "lucide-react";
import { Share } from "../../../common/share";
import Benefit from "./benefit";
import HeroSkeleton from "./loader";
import { useProductStore } from "@/store/user/product.store";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
export default function Hero() {
  const { data, isLoading, isFetching } = useProductStore();

  if (isLoading || isFetching || !data) return <HeroSkeleton />;

  const { type, displayName, description, price, mrp } = data;
  return (
    <article className="w-full xl:min-w-150 space-y-2">
      <h2 className="uppercase font-semibold text-[0.875rem] tracking-[0.6px]">
        {type}
      </h2>

      <Nutrition {...data}></Nutrition>

      <h1 className="text-[2.375rem] leading-[120%]">
        <span>{displayName}</span>
      </h1>
      <p className="text-[1.125rem] font-light">{description}</p>

      <div className="mt-13">
        <div className="flex items-center gap-4.5">
          {price != mrp ? (
            <>
              <p className="text-[1.875rem] font-bold">₹{formatPrice(price)}</p>
              <p className="text-muted-foreground line-through">
                ₹{formatPrice(mrp)}
              </p>
            </>
          ) : (
            <>
              <p className="text-[1.875rem] font-bold">₹{formatPrice(price)}</p>
            </>
          )}
        </div>
      </div>

      <Benefit {...data}></Benefit>

      <div className="flex items-center justify-center gap-4 flex-col w-full mt-4">
        <Count {...data} />

        <Button
          variant={"outline"}
          className="w-full h-14!  border-black border-2 font-bold"
          size="lg"
        >
          Subscribe (₹21.5)
        </Button>
        <div className="bg-muted flex items-center gap-3.25 w-full p-3 rounded-md">
          <div className="bg-muted-foreground/10 flex items-center rounded-full justify-center p-2">
            <Star className="fill-black"></Star>
          </div>

          <div className="text-[0.75rem]">
            <h2 className="font-bold">Loyalty Reward</h2>
            <p>Earn 50 pts with this purchase</p>
          </div>
        </div>

        {data.recipes.length > 0 ? (
          <>
            <div className="border-2 rounded-md border-black p-3 w-full">
              <h2 className="flex items-center gap-2 font-bold">
                <ChefHat></ChefHat>
                <span>Recipe Ideas</span>
              </h2>

              <ul className="list-disc pl-5 mt-4 text-[0.875rem] font-light tracking-[0%] flex flex-col gap-2">
                {data.recipes.map((ele) => (
                  <Link
                    href={`/recipes/all/${ele.slug}`}
                    className="hover:underline"
                  >
                    <li>{ele.title}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {/* <p className="text-[0.875rem] mt-5 text-muted-foreground">
        <strong>Best For:</strong> Salads, Toast Topping, Smoothies, Baby Food,
        Farm Origin, Based on IFCT 2017 standards.
      </p> */}

      <Share>
        <div className="text-muted-foreground flex gap-2 items-center mt-6 cursor-pointer hover:text-black transition">
          <Share2 />
          <p>Share with family and friends</p>
        </div>
      </Share>
    </article>
  );
}
