"use client";

import { cn } from "@/lib/utils";
import { useProduct } from "@/provider/product.provider";
import { Product, Variant } from "@/types/product";

type Props = {
  options: Product["options"];
  variants: Variant[];
};

export default function VariantSelector({ options, variants }: Props) {
  const { selectedOptions, setOptionValue } = useProduct();

  // Check if this option value exists in any variant
  const isValueAvailable = (optionSlug: string, valueSlug: string) => {
    return variants.some((variant) =>
      variant.options.some(
        (opt) => opt.option === optionSlug && opt.optionValue === valueSlug,
      ),
    );
  };

  return (
    <div className="space-y-5 mt-6">
      {options.map((opt) => (
        <div key={opt.slug} className="space-y-2">
          {/* Option Name */}
          <p className="text-xs font-semibold text-muted-foreground">
            {opt.displayName}
          </p>

          {/* Values */}
          <div className="flex flex-wrap gap-2">
            {opt.values
              .filter((val) => isValueAvailable(opt.slug, val.slug)) // 👈 HIDE UNUSED
              .map((val) => {
                const isSelected =
                  selectedOptions[opt.slug]?.value.slug === val.slug;

                return (
                  <button
                    key={val.slug}
                    type="button"
                    onClick={() => setOptionValue(opt.slug, val.slug)}
                    className={cn(
                      "px-5 py-2 rounded-md text-sm border transition",
                      "hover:border-black hover:text-black",

                      // Selected
                      isSelected && "border-maroon text-maroon font-medium",

                      // Not selected
                      !isSelected &&
                        "border-muted-foreground/30 text-muted-foreground",
                    )}
                  >
                    {val.displayName}
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
