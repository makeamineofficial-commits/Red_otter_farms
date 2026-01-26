"use client";

const CATEGORIES = [
  {
    name: "Salads",
    slug: "salads",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    summary:
      "Crisp, colorful salads made with fresh greens, superfoods, and wholesome ingredients to keep every meal light, nourishing, and satisfying.",
  },
  {
    name: "Fruits",
    slug: "fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
    summary:
      "Juicy, naturally sweet fruits packed with vitamins and antioxidants to fuel your day and support overall wellness.",
  },
  {
    name: "Cheese",
    slug: "cheese",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d",
    summary:
      "Indulgent, artisanal cheeses with rich textures and bold flavors, perfect for everyday meals or gourmet moments.",
  },
  {
    name: "Vegetables",
    slug: "vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    summary:
      "Fresh, farm-picked vegetables that bring natural goodness, vibrant color, and balanced nutrition to your plate.",
  },
  {
    name: "Dairy Products",
    slug: "dairy-products",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    summary:
      "Pure and nutritious dairy essentials crafted for strength, energy, and everyday nourishment for the whole family.",
  },
  {
    name: "Soup",
    slug: "soup",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd",
    summary:
      "Warm, comforting soups made with hearty ingredients and rich flavors, perfect for cozy meals in any season.",
  },
];

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export default function Banner() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {CATEGORIES.map((category) => (
          <CarouselItem key={category.slug}>
            <div className="relative w-full h-125 rounded-3xl overflow-hidden ">
              {/* LEFT CONTENT */}
              <div className="absolute bottom-10  flex items-center z-50 ">
                <div className="px-6 md:px-14 space-y-4 text-white max-w-xl">
                  <p className="uppercase tracking-widest text-sm text-white/70">
                    Explore Categories
                  </p>

                  <h1 className="font-dream-orphans text-4xl md:text-6xl leading-tight">
                    {category.name}
                  </h1>

                  <p className="text-base md:text-lg text-white/80 ">
                    {category.summary}
                  </p>

                  <Link href={`/categories/${category.slug}`}>
                    <Button className="bg-forest hover:bg-forest/90 text-white h-auto! px-8! py-4! rounded-full">
                      Explore Now →
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="absolute top-0 left-0 h-full w-full bg-black/50 z-10"></div>
              {/* RIGHT IMAGE */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
