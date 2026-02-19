"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sliders, X } from "lucide-react";
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

const specialCategories = [
  { label: "Presented By RedOtter", slug: "by-red-otter" },
  { label: "Under 99/-", slug: "under-99" },
  { label: "Under 299/-", slug: "under-299" },
];

const benefits = [
  "Low in Fat",
  "High Protein",
  "Rich in Fiber",
  "No Added Sugar",
  "Gluten Free",
  "Heart Healthy",
  "Rich in Vitamins",
  "Low Sodium",
  "Immunity Booster",
  "Natural Ingredients",
];

function FilterSection({ children }: { children?: ReactNode }) {
  const { data } = useProductListingStore();
  const router = useRouter();
  const pathname = usePathname();

  const [inStock, setInStock] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>(DEFAULT_PRICE);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const stock = searchParams.get("inStock");
    setInStock(stock === "true");
  }, [pathname]);

  const updateQuery = (params: {
    inStock?: string;
    maxPrice?: string;
    benefit?: string[];
    page?: string;
  }) => {
    const search = new URLSearchParams(window.location.search);

    // Remove old multi params
    if (params.benefit) {
      search.delete("benefit");
    }

    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        search.delete(key);
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((v) => search.append(key, v));
      } else {
        search.set(key, value);
      }
    });

    router.push(`${pathname}?${search.toString()}`, { scroll: false });
  };

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

  const handleCategoryClick = (slug: string) => {
    setPrice(DEFAULT_PRICE);
    setSelectedCategories([slug]);
    router.push(`/categories/${slug}`, { scroll: false });
  };

  const toggleBenefit = (benefit: string) => {
    setSelectedBenefits((prev) => {
      let next: string[];

      if (prev.includes(benefit)) {
        next = prev.filter((b) => b !== benefit);
      } else {
        next = [...prev, benefit];
      }

      updateQuery({
        benefit: next,
        page: "1",
      });

      return next;
    });
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
          <p className="text-xs font-semibold">By Price</p>
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

      <Separator />

      {/* BENEFITS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold">Benefits</p>
        </div>

        <div className="space-y-2">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 text-sm">
              <Checkbox
                id={benefit}
                checked={selectedBenefits.includes(benefit)}
                onCheckedChange={() => toggleBenefit(benefit)}
              />

              <label htmlFor={benefit} className="cursor-pointer">
                {benefit}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* PRICE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold">Specials</p>
        </div>

        <div className="space-y-2">
          {specialCategories.map((category) => (
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
    </div>
  );
}

export default function Filter() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <aside className="hidden lg:block border rounded-2xl sticky top-50 max-h-500">
        <nav>
          <FilterSection />
        </nav>
      </aside>
      <aside className=" flex lg:hidden">
        <div className=" items-center gap-2 ">
          <Sliders
            className="rotate-90"
            size={20}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>

        <div
          onClick={() => setOpen(false)}
          className={`bg-black/30 fixed top-0 left-0 h-screen z-90 w-screen ${open ? "block lg:hidden" : "hidden"}`}
        ></div>
        <nav
          className={`fixed top-0 left-0  bg-white shadow-xl h-screen block lg:hidden z-100 overflow-x-hidden overflow-y-auto no-scrollbar transition-all duration-200 ${open ? "max-w-96" : "max-w-0"} `}
        >
          <div className="p-4">
            <FilterSection>
              <X
                className="absolute top-5 right-4"
                onClick={() => setOpen((prev) => !prev)}
              ></X>
            </FilterSection>
          </div>
        </nav>
      </aside>
    </>
  );
}
