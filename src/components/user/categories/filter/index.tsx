"use client";

import { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sliders, X } from "lucide-react";
import { useProductListingStore } from "@/store/user/products.store";
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
      if (value === undefined || value === "") {
        search.delete(key);
      } else {
        search.set(key, value);
      }
    });

    router.push(`${pathname}?${search.toString()}`);
  };

  const handleCategoryClick = (slug: string) => {
    setInStock(true);
    setPrice(DEFAULT_PRICE);
    setSelectedCategories([slug]);
    router.push(`/categories/${slug}`);
  };

  return (
    <div className="w-72  p-4 space-y-6 relative">
      {children}
      <div className="flex items-center gap-2">
        <Sliders className="rotate-90" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      {/* Stock */}
      <div className="space-y-2">
        <p className="text-xs font-semibold ">By Stock</p>
        <div className="flex items-center justify-between">
          <span className="text-sm">
            In Stock {data ? <>({data.total}+)</> : <></>}
          </span>
          <Switch
            checked={inStock}
            onCheckedChange={(checked) => {
              setInStock(checked);
              updateQuery({ inStock: checked ? "true" : undefined, page: "1" });
            }}
          />
        </div>
      </div>

      <Separator />

      {/* Category */}
      <div className="space-y-3">
        <p className="text-xs font-semibold ">By Category</p>

        <div className="space-y-2">
          <div key={"all"} className="flex items-center gap-2 text-sm">
            <Checkbox
              id={"all"}
              checked={pathname === "/categories"}
              onCheckedChange={() => handleCategoryClick("")}
            />
            <label htmlFor={"all"} className="cursor-pointer leading-none">
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
              <label
                htmlFor={category.slug}
                className="cursor-pointer leading-none"
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">By Price</p>
          <Badge variant="secondary">₹{price[0]}</Badge>
        </div>
        <Slider
          value={price}
          onValueChange={(val) => {
            setPrice(val);
            updateQuery({
              maxPrice: String(val[0]),
              page: "1",
            });
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

export default function Filter() {
  const [open, setOpen] = useState(false);
  return (
    <aside>
      <nav className="hidden lg:block border rounded-2xl">
        <FilterSection />
      </nav>

      <div className=" items-center gap-2  flex lg:hidden">
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
        className={`fixed top-0 left-0  bg-white shadow-xl h-screen block lg:hidden z-100 overflow-hidden transition-all duration-200 ${open ? "max-w-96" : "max-w-0"} `}
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
  );
}
