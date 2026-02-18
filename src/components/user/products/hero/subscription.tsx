"use client";

import { cn } from "@/lib/utils";
import { useProduct } from "@/provider/product.provider";
import { Product, Variant } from "@/types/product";

type Props = {
  options: Product["options"];
  variants: Variant[];
};

export default function SubscriptionSelector({ options, variants }: Props) {
  const { selectedOptions, setOptionValue } = useProduct();
  const option = options[0];

  // Check if value exists in any variant
  const isValueAvailable = (valueSlug: string) => {
    return variants.some((variant) =>
      variant.options.some(
        (opt) => opt.option === option.slug && opt.optionValue === valueSlug,
      ),
    );
  };

  const defaultSlug = option.values.find((ele) => ele.isDefault)?.slug ?? "";

  const isSelected = (valueSlug: string) =>
    selectedOptions[option.slug]?.value.slug === valueSlug;

  return (
    <div className="mt-6 bg-muted rounded-lg p-4 space-y-4">
      {/* Buy Now */}
      <button
        type="button"
        onClick={() => setOptionValue(option.slug, defaultSlug)}
        className={cn(
          "w-full flex items-center gap-3 text-left transition text-sm",
        )}
      >
        {/* Checkbox */}
        <div
          className={cn(
            "h-4 w-4 rounded border flex items-center justify-center transition",
            isSelected(defaultSlug)
              ? "border-maroon bg-maroon"
              : "border-muted-foreground/40 bg-white",
          )}
        >
          {isSelected(defaultSlug) && (
            <div className="h-2 w-2 bg-white rounded-sm" />
          )}
        </div>

        <span
          className={cn(
            isSelected(defaultSlug)
              ? "text-maroon font-medium"
              : "text-muted-foreground",
          )}
        >
          Buy Now
        </span>
      </button>

      {/* Subscription Section */}
      {option.values.some(
        (val) => !val.isDefault && isValueAvailable(val.slug),
      ) && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Subscription
          </p>

          {option.values
            .filter((val) => !val.isDefault && isValueAvailable(val.slug))
            .map((val) => (
              <button
                key={val.slug}
                type="button"
                onClick={() => setOptionValue(option.slug, val.slug)}
                className="w-full flex items-center gap-3 text-left text-sm pl-4"
              >
                {/* Checkbox */}
                <div
                  className={cn(
                    "h-4 w-4 rounded border flex items-center justify-center transition",
                    isSelected(val.slug)
                      ? "border-maroon bg-maroon"
                      : "border-muted-foreground/40 bg-white",
                  )}
                >
                  {isSelected(val.slug) && (
                    <div className="h-2 w-2 bg-white rounded-sm" />
                  )}
                </div>

                <span
                  className={cn(
                    isSelected(val.slug)
                      ? "text-maroon font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {val.displayName}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
