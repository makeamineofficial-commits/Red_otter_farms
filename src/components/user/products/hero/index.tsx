"use client";

import Count from "./count";
import Nutrition from "./nutrition";
import { ChefHat, Share2, Star } from "lucide-react";
import { Share } from "../../../common/share";
import Benefit from "./benefit";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useProduct } from "@/provider/product.provider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, Variant } from "@/types/product";

export default function Hero({
  product,
}: {
  product: Product & {
    recipes: { title: string; slug: string }[];
    variants: Variant[];
  };
}) {
  const { selectedVariant, selectedOptions, setOptionValue } = useProduct();

  const { type, displayName, description, options, variants } = product;

  const hasMultipleVariants = variants.length > 1;

  const isOptionValueValid = (optionSlug: string, valueSlug: string) => {
    return variants.some((variant) =>
      variant.options.every((opt) => {
        if (opt.option === optionSlug) return opt.optionValue === valueSlug;

        const selected = selectedOptions[opt.option];
        return selected ? selected.value.slug === opt.optionValue : true;
      }),
    );
  };

  return (
    <article className="w-full xl:min-w-150 space-y-5">
      <h2 className="uppercase font-semibold text-maroon text-[0.875rem] tracking-[0.6px]">
        {type}
      </h2>

      <Nutrition {...product} />

      <div className="space-y-1.5">
        <h1 className="text-[2.375rem] leading-[120%] font-semibold">
          {displayName}
        </h1>

        <p className="text-[1.125rem] font-light">{description}</p>
      </div>

      <Benefit {...product} />

      {hasMultipleVariants && options.length > 0 && (
        <div className="space-y-4 mt-6">
          {options.map((opt) => (
            <div key={opt.slug} className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">
                {opt.displayName}
              </p>

              <Select
                value={selectedOptions[opt.slug]?.value.slug || ""}
                onValueChange={(value) => setOptionValue(opt.slug, value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select ${opt.displayName}`} />
                </SelectTrigger>

                <SelectContent>
                  {opt.values.map((val) => {
                    const isValid = isOptionValueValid(opt.slug, val.slug);

                    return (
                      <SelectItem
                        key={val.slug}
                        value={val.slug}
                        disabled={!isValid}
                      >
                        {val.displayName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}

      <div className="mt-9">
        <div className="flex items-end gap-2">
          {selectedVariant?.price !== selectedVariant?.mrp ? (
            <>
              <p className="text-[1.875rem] font-bold leading-none">
                ₹{formatPrice(selectedVariant?.price ?? 0)}
              </p>

              <p className="text-muted-foreground line-through">
                ₹{formatPrice(selectedVariant?.mrp ?? 0)}
              </p>
            </>
          ) : (
            <p className="text-[1.875rem] font-bold">
              ₹{formatPrice(selectedVariant?.price ?? 0)}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 flex-col w-full mt-4">
        <Count product={product} />

        <div className="bg-muted flex items-center gap-3 w-full p-3 rounded-md">
          <div className="bg-muted-foreground/10 p-2 rounded-full">
            <Star className="fill-maroon stroke-maroon" />
          </div>

          <div className="text-[0.75rem] text-maroon">
            <h2 className="font-bold">Loyalty Reward</h2>
            <p>Earn 50 pts with this purchase</p>
          </div>
        </div>

        {product.recipes.length > 0 && (
          <div className="border-2 rounded-md  p-3 w-full">
            <h2 className="flex items-center gap-2 font-bold">
              <ChefHat className="fill-maroon stroke-maroon" />
              <span className="text-maroon">Recipe Ideas</span>
            </h2>

            <ul className="list-disc pl-5 mt-4 text-sm font-light flex flex-col gap-2">
              {product.recipes.map((ele) => (
                <Link
                  key={ele.slug}
                  href={`/recipe/${ele.slug}`}
                  target="_blank"
                  className="hover:underline"
                >
                  <li>{ele.title}</li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Share>
        <div className="text-muted-foreground flex gap-2 items-center mt-6 cursor-pointer hover:text-black transition">
          <Share2 />
          <p>Share with family and friends</p>
        </div>
      </Share>
    </article>
  );
}
