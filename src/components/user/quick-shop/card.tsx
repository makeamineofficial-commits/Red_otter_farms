"use client";

import React, { useState } from "react";
import { ProductPreview, Product, Variant } from "@/types/product";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionTrigger2,
  AccordionTrigger3,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/provider/cart.provider";
import { useDebouncedCallback } from "use-debounce";
import { CartItem } from "@/lib/db";

type Props = {
  displayName: string;
  description: string;
  slug: string;
  products: (Product & { variants: Variant[] })[];
};

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { convertToCartItem, formatPrice } from "@/lib/utils";

export function ProductCard(product: Product & { variants: Variant[] }) {
  const { displayName, description, assets, slug, variants } = product;
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
    <div className="  p-3 space-y-3 w-full  relative flex sm:flex-row flex-col items-center gap-3 justify-between">
      <div className="flex gap-5 items-center">
        <div className="relative aspect-square w-16 h-16 rounded-md overflow-hidden bg-muted">
          <Image
            src={assets[0].url}
            alt={displayName}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col  justify-center gap-1 md:gap-0">
          <Link href={`/products/${slug}`} className="hover:underline">
            <p className=" font-medium line-clamp-1 text-lg capitalize">
              {displayName.toLowerCase()}
            </p>
          </Link>

          <p className="text-sm flex  ">
            ₹{formatPrice(selectedVariant?.price ?? 0)}
          </p>
          <div className="items-center justify-start w-auto min-w-60 md:hidden flex">
            <div className="flex gap-2 items-start">
              {availableOptions.map((ele) => (
                <Badge
                  className={` cursor-pointer text-xs!  ${selectedVariant?.sku === ele.sku ? "bg-maroon hover:bg-maroon!" : "border-maroon"}`}
                  onClick={() =>
                    setVariant(
                      variants.find((variant) => ele.sku === variant.sku) ??
                        null,
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
      </div>

      <div className="items-center justify-start w-auto min-w-60 md:flex hidden">
        <div className="flex gap-2 items-start">
          {availableOptions.length > 1 &&
            availableOptions.map((ele) => (
              <Button
                size={"sm"}
                className={`cursor-pointer text-xs!  ${selectedVariant?.sku === ele.sku ? "bg-maroon hover:bg-maroon!" : "border-maroon"}`}
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
              </Button>
            ))}
        </div>
      </div>

      <div className="flex  items-center gap-2 relative z-10 ml-auto sm:ml-0">
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
            className="bg-transparent! flex sm:hidden border rounded-lg! border-maroon! text-maroon!"
            onClick={() => {
              if (!selectedVariant) return;
              update({
                toggle: false,
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
            Add
          </Button>
          <Button
            size="sm"
            className="bg-transparent! hidden sm:flex border rounded-lg! border-maroon! text-maroon!"
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

export default function QuickShopCard({
  displayName,
  description,
  slug,
  products,
}: Props) {
  return (
    <div className="">
      <Accordion type="single" collapsible className=" rounded-md">
        <AccordionItem value={slug}>
          <AccordionTrigger3 showCross={true} className="border-b">
            <div className="flex flex-col ">
              <span className="font-semibold  text-lg md:text-2xl">
                {displayName}
              </span>
            </div>
          </AccordionTrigger3>

          <AccordionContent className="pt-2">
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
