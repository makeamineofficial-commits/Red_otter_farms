"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { Product, Variant } from "@/types/product";
import { useProductStore } from "@/store/user/product.store";

interface SelectedOptions {
  [optionSlug: string]: {
    displayName: string;
    value: { slug: string; displayName: string };
  };
}

interface ProductVariantContextValue {
  selectedVariant: Variant | null;
  selectedOptions: SelectedOptions;
  setOptionValue: (optionSlug: string, valueSlug: string) => void;
  reset: () => void;
}

const ProductVariantContext = createContext<ProductVariantContextValue | null>(
  null,
);

interface Props {
  children: React.ReactNode;
  product: Product & {
    recipes: { title: string; slug: string }[];
    variants: Variant[];
  };
}

export const ProductProvider = ({ children, product: data }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const variants = data?.variants || [];
  const product = data || null;
  const defaultVariant = variants.find((v) => v.isDefault) || variants[0];

  // Initialize selected options when product/variants load
  useEffect(() => {
    if (!defaultVariant || !product) return;

    const obj: SelectedOptions = {};
    defaultVariant.options.forEach((opt) => {
      const optionMeta = product.options.find((o) => o.slug === opt.option);
      if (!optionMeta) return;
      const valueMeta = optionMeta.values.find(
        (v) => v.slug === opt.optionValue,
      );
      if (!valueMeta) return;

      obj[opt.option] = {
        displayName: optionMeta.displayName,
        value: { slug: valueMeta.slug, displayName: valueMeta.displayName },
      };
    });

    setSelectedOptions(obj);
  }, [defaultVariant, product]);

  // Compute selected variant based on selected options
  const selectedVariant = useMemo(() => {
    if (!variants.length) return null;
    return (
      variants.find((variant) =>
        variant.options.every(
          (opt) => selectedOptions[opt.option]?.value.slug === opt.optionValue,
        ),
      ) || null
    );
  }, [variants, selectedOptions]);

  // Function to set a new option value
  const setOptionValue = (optionSlug: string, valueSlug: string) => {
    if (!product) return;
    const optionMeta = product.options.find((o) => o.slug === optionSlug);
    if (!optionMeta) return;
    const valueMeta = optionMeta.values.find((v) => v.slug === valueSlug);
    if (!valueMeta) return;

    setSelectedOptions((prev) => {
      const next = {
        ...prev,
        [optionSlug]: {
          displayName: optionMeta.displayName,
          value: { slug: valueMeta.slug, displayName: valueMeta.displayName },
        },
      };

      // Remove invalid selections if combination doesn't exist
      Object.keys(next).forEach((optSlug) => {
        const selValue = next[optSlug]?.value.slug;
        if (
          !variants.some((v) =>
            v.options.every((o) =>
              o.option === optSlug ? o.optionValue === selValue : true,
            ),
          )
        ) {
          delete next[optSlug];
        }
      });

      return next;
    });
  };

  const reset = () => {
    if (!defaultVariant || !product) return;

    const obj: SelectedOptions = {};
    defaultVariant.options.forEach((opt) => {
      const optionMeta = product.options.find((o) => o.slug === opt.option);
      if (!optionMeta) return;
      const valueMeta = optionMeta.values.find(
        (v) => v.slug === opt.optionValue,
      );
      if (!valueMeta) return;

      obj[opt.option] = {
        displayName: optionMeta.displayName,
        value: { slug: valueMeta.slug, displayName: valueMeta.displayName },
      };
    });

    setSelectedOptions(obj);
  };

  return (
    <ProductVariantContext.Provider
      value={{
        selectedVariant,
        selectedOptions,
        setOptionValue,
        reset,
      }}
    >
      {children}
    </ProductVariantContext.Provider>
  );
};

export const useProduct = () => {
  const ctx = useContext(ProductVariantContext);
  if (!ctx)
    throw new Error("useProductVariant must be used inside ProductProvider");
  return ctx;
};
