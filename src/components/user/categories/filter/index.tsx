"use client";

import { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sliders } from "lucide-react";
import { useProductListingStore } from "@/store/user/products.store";
import { useDebouncedCallback } from "use-debounce";

const DEFAULT_PRICE = [300];

const categories = [
  { label: "Fruits", slug: "fruits" },
  { label: "Cheese", slug: "cheese" },
  { label: "Vegetables", slug: "vegetables" },
  { label: "Salads", slug: "salads" },
  { label: "Dairy Products", slug: "dairy-products" },
  { label: "Soups", slug: "soups" },
  { label: "Flour & Grain", slug: "flour" },
];

function FilterSection({ children }: { children?: ReactNode }) {
  const { data } = useProductListingStore();
  const router = useRouter();
  const pathname = usePathname();

  const [inStock, setInStock] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>(DEFAULT_PRICE);

  const updateQuery = (params: Record<string, string | undefined>) => {
    const search = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        search.delete(key);
      } else {
        search.set(key, value);
      }
    });

    router.push(`${pathname}?${search.toString()}`);
  };

  /* ---------------- DEBOUNCED HANDLERS ---------------- */

  const debouncedPriceUpdate = useDebouncedCallback((val: number[]) => {
    updateQuery({
      maxPrice: String(val[0]),
      page: "1",
    });
  }, 400);

  const debouncedStockUpdate = useDebouncedCallback((checked: boolean) => {
    updateQuery({
      inStock: checked ? "true" : undefined,
      page: "1",
    });
  }, 300);

  /* ---------------------------------------------------- */

  const handleCategoryClick = (slug: string) => {
    setInStock(true);
    setPrice(DEFAULT_PRICE);
    setSelectedCategories([slug]);
    router.push(`/categories/${slug}`);
  };

  return (
    <div className="w-72 p-4 space-y-6 relative">
      {children}

      {/* HEADER */}
      <div className="flex items-center gap-2">
        <Sliders className="rotate-90" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      {/* STOCK */}
      <div className="space-y-2">
        <p className="text-xs font-semibold">By Stock</p>
        <div className="flex items-center justify-between">
          <span className="text-sm">
            In Stock {data ? <>({data.total}+)</> : null}
          </span>
          <Switch
            checked={inStock}
            onCheckedChange={(checked) => {
              setInStock(checked);
              debouncedStockUpdate(checked);
            }}
          />
        </div>
      </div>

      <Separator />

      {/* CATEGORY */}
      <div className="space-y-3">
        <p className="text-xs font-semibold">By Category</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Checkbox
              id="all"
              checked={pathname === "/categories"}
              onCheckedChange={() => handleCategoryClick("")}
            />
            <label htmlFor="all" className="cursor-pointer">
              All Products
            </label>
          </div>

          {categories.map((category) => (
            <div
              key={category.slug}
              className="flex items-center gap-2 text-sm"
            >
              <Checkbox
                id={category.slug}
                checked={pathname.includes(category.slug)}
                onCheckedChange={() => handleCategoryClick(category.slug)}
              />
              <label htmlFor={category.slug} className="cursor-pointer">
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* PRICE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">By Price</p>
          <Badge variant="secondary">₹{price[0]}</Badge>
        </div>

        <Slider
          value={price}
          onValueChange={(val) => {
            setPrice(val);
            debouncedPriceUpdate(val);
          }}
          max={300}
          min={30}
          step={10}
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹30</span>
          <span>₹300</span>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
