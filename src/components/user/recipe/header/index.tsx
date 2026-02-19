"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Salad, Soup, Apple, Dessert, CookingPot } from "lucide-react";
import Search from "./search";
const categories = [
  { label: "All Recipes", icon: <CookingPot /> },
  { label: "Salads", slug: "salads", icon: <Salad /> },
  { label: "Smoothies", slug: "smoothies", icon: <Apple /> },
  { label: "Soups", slug: "soups", icon: <Soup /> },
  { label: "Desserts", slug: "desserts", icon: <Dessert /> },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { slug } = useParams();

  if (slug) return <></>;
  return (
    <article className="flex flex-wrap gap-2 items-center justify-between">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive =
            (!cat.slug && pathname === "/recipes") ||
            pathname === `/recipes/${cat.slug}`;

          return (
            <Button
              key={cat.slug}
              variant={isActive ? "default" : "outline"}
              onClick={() =>
                router.push(`/recipes/${cat.slug ? cat.slug : ""}`)
              }
              className={cn(
                "rounded-full px-5 transition-all duration-300 ease-out",
                "hover:-translate-y-0.5 active:scale-95",
                isActive
                  ? "bg-forest text-white shadow-md shadow-green-100 hover:bg-forest"
                  : "hover:bg-muted",
              )}
            >
              {cat.icon}
              {cat.label}
            </Button>
          );
        })}
      </div>
      <Search></Search>
    </article>
  );
}
