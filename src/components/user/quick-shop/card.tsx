"use client";

import React, { useState } from "react";
import { ProductPreview, Product, Variant } from "@/types/product";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionTrigger2,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/provider/cart.provider";
import { useDebouncedCallback } from "use-debounce";
import { CartItem } from "@/lib/db";

type Props = {
  displayName: string;
  slug: string;
  products: (Product & { variants: Variant[] })[];
};

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { convertToCartItem, formatPrice } from "@/lib/utils";

export function ProductCard(product: Product & { variants: Variant[] }) {
  const {
    displayName,

    assets,
    slug,
    variants,
  } = product;
  const { update, cart } = useCart();
  const [count, setCount] = useState(1);

  const [selectedVariant, setVariant] = useState<Variant | null>(
    variants.find((ele) => ele.isDefault) ?? null,
  );
  useEffect(() => {
    if (!cart || !selectedVariant) {
      return;
    }

    const count =
      cart.items.find(
        (ele) => ele.variant.publicId === selectedVariant.publicId,
      )?.quantity ?? 1;

    if (count) {
      setCount(count);
    }
  }, [cart, selectedVariant]);

  const availableOptions = variants.map((variant) => {
    const { options, sku } = variant;
    if (options.length >= 2) console.log(variant.name);
    return {
      label: options
        .map((cur) => {
          return product.options
            .find((ele) => ele.slug === cur.option)
            ?.values.find((ele) => ele.slug === cur.optionValue)?.displayName;
        })
        .filter(Boolean)
        .join(" | "),
      sku,
    };
  });

  return (
    <div className="  p-3 space-y-3 w-full  relative flex  gap-3 ">
      <div className="flex gap-5 items-center w-full">
        <div className="relative aspect-square w-12 h-12 overflow-hidden bg-muted">
          <Image
            src={assets[0].url}
            alt={displayName}
            fill
            className="object-cover"
          />
        </div>

        {/* TITLE + PRICE */}
        <div className="space-y-1 flex flex-col  justify-center">
          <Link href={`/products/${slug}`} className="hover:underline">
            <p className=" font-medium line-clamp-1 text-lg">{displayName}</p>
          </Link>
          <div className="flex gap-2">
            {availableOptions.map((ele) => (
              <Badge
                className="cursor-pointer"
                onClick={() =>
                  setVariant(
                    variants.find((variant) => ele.sku === variant.sku) ?? null,
                  )
                }
                variant={
                  selectedVariant?.sku === ele.sku ? "default" : "outline"
                }
              >
                {ele.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <p className="text-lg font-semibold h-12 flex items-center justify-center mx-auto w-full">
        ₹{formatPrice(selectedVariant?.price ?? 0)}
      </p>

      {/* QUANTITY + CART */}
      <div className="flex items-center gap-2 relative z-10 ">
        <div className="flex items-center border rounded-lg">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCount((prev) => Math.max(1, prev - 1))}
          >
            <Minus className="size-4" />
          </Button>
          <span className="px-2 text-sm">{count}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCount((prev) => prev + 1)}
          >
            <Plus className="size-4" />
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            className="bg-transparent! border rounded-lg! border-maroon! text-maroon!"
            onClick={() => {
              if (!selectedVariant) return;
              update({
                item: {
                  variant: {
                    options: selectedVariant.options.map(
                      (ele) => ele.optionValue,
                    ),
                    sku: selectedVariant.sku,
                    price: selectedVariant.price,
                    publicId: selectedVariant.publicId,
                  },
                  product: {
                    displayName: product.displayName,
                    summary: product.summary,
                    nutritionalInfo: product.nutritionalInfo,
                    assets: product.assets,
                    slug: product.slug,
                  },
                },
                quantity: count,
              });
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function QuickShopCard({ displayName, slug, products }: Props) {
  return (
    <div className="">
      <Accordion type="single" collapsible>
        <AccordionItem value={slug} className="border-none!">
          <AccordionTrigger
            showCross={true}
            className="px-4 py-3  text-left border-b"
          >
            <span className="font-semibold text-base text-gray-800">
              {displayName}
            </span>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-4 pt-2">
            {products.length === 0 ? (
              <p className="text-sm text-gray-500">No products available</p>
            ) : (
              <div className="flex gap-3 flex-col">
                {products.map((product) => (
                  <ProductCard key={product.slug} {...product} />
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
