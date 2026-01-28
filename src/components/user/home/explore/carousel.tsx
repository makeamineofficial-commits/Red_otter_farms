import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
type ProductCardProps = {
  image: string;
  tag: string;
  title: string;
  description: string;
  price: string;
  isLast?: boolean;
};

export function ProductCard({
  image,
  tag,
  title,
  description,
  price,
  isLast = false,
}: ProductCardProps) {
  return (
    <div
      className={`border border-forest ${isLast ? "border-r" : "border-r-0"} 
         flex flex-col h-full `}
    >
      {/* Image */}
      <div className="relative w-full aspect-square p-6">
        <span className="absolute top-4 left-4 text-xs border border-forest rounded-full px-3 py-1">
          {tag}
        </span>

        <Image src={image} alt={title} fill className="object-contain" />
      </div>

      {/* Content */}
      <div className="border-t border-forest p-6 flex flex-col">
        <h3 className="font-semibold uppercase text-sm">{title}</h3>
        <p className="text-sm opacity-70">{description}</p>
        <div className="flex items-center justify-between ">
          <span className="font-semibold">{price}</span>
          <Button
            variant="outline"
            className="bg-transparent! rounded-lg! border-red-500! text-red-500!"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

const products = [
  {
    image: "/home/explore-1.png",
    tag: "Salads",
    title: "Spicy Salad Blend",
    description: "A mix of our four best sellers",
    price: "₹120",
  },
  {
    image: "/home/explore-2.png",
    tag: "Salads",
    title: "Iceberg Lettuce",
    description: "Best for sandwiches and wraps",
    price: "₹50",
  },
  {
    image: "/home/explore-3.png",
    tag: "Vegetables",
    title: "Turnips",
    description: "Fresh, recently harvested from local farms",
    price: "₹44",
  },
  {
    image: "/home/explore-1.png",
    tag: "Salads",
    title: "Spicy Salad Blend",
    description: "A mix of our four best sellers",
    price: "₹120",
  },
];

export default function ProductCarousel() {
  return (
    <section className="w-full overflow-hidden bg-herbal">
      <Carousel opts={{ align: "start" }} className="overflow-visible">
        <CarouselContent className="">
          {products.map((p, i) => (
            <CarouselItem
              key={i}
              className="
                pl-0! pt-0!
                basis-[85%]
                md:basis-1/2
                lg:basis-1/3
              "
            >
              <ProductCard {...p} isLast={i === products.length - 1} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
