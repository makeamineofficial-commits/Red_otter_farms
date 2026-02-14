import { Item } from "@/types/cart";
import { ProductPreview } from "@/types/product";
import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { randomUUID } from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSlug = (prefix: string, content: string) => {
  const slugBase = content
    .toLowerCase()
    .trim()
    .normalize("NFKD") // handle accents
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 50);

  const uuid = randomUUID().replace(/-/g, "");

  return `${prefix}_${slugBase}_${uuid}`;
};

export const nullToUndefined = <T extends Record<string, any>>(obj: T) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null ? undefined : value,
    ]),
  ) as {
    [K in keyof T]: T[K] extends null ? undefined : T[K];
  };
};

export const numberField = (field: any) => {
  const [inputValue, setInputValue] = React.useState<string>(
    field.value !== undefined && field.value !== null
      ? String(field.value)
      : "",
  );

  React.useEffect(() => {
    setInputValue(
      field.value !== undefined && field.value !== null
        ? String(field.value)
        : "",
    );
  }, [field.value]);

  return {
    value: inputValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      const val = e.target.value;

      field.onChange(val === "" ? undefined : Number(val));
    },
    onBlur: () => {
      if (inputValue === "") {
        field.onChange(undefined);
      }
    },
  };
};

export const formatPrice = (val: number) => {
  return (val / 100).toFixed(2);
};
export function isNCRPincode(pincode: string): boolean {
  const prefix = pincode.slice(0, 3);

  return (
    prefix.startsWith("11") ||
    prefix.startsWith("122") ||
    prefix.startsWith("201") ||
    prefix.startsWith("121")
  );
}

export const convertToCartItem = (product: ProductPreview): Item => {
  return {
    variant: {
      sku: product.sku,
      price: product.price,
      publicId: product.variantId,
      options: product.variantOption,
    },
    product: {
      displayName: product.displayName,
      summary: product.summary,
      nutritionalInfo: product.nutritionalInfo,
      assets: product.assets,
      slug: product.slug,
    },
  };
};
