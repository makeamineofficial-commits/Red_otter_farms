import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type GreensCardProps = {
  image: string;
  title: string;
  price: string;
};

export function GreensCard({ image, title, price }: GreensCardProps) {
  return (
    <div className="border border-mint/40 bg-forest flex flex-col">
      {/* Image */}
      <div className="relative w-full aspect-4/3">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="flex  justify-between p-5 flex-col">
        <div className="flex justify-between ">
          <p
            className="uppercase text-[1.25rem] font-bold text-mint
              truncate max-w-[70%]"
          >
            {title}
          </p>

          <Button
            size="sm"
            variant={"outline"}
            className="uppercase  h-auto! py-2.5! rounded-lg! text-white bg-transparent! "
          >
            Add to cart
          </Button>
        </div>
        <p className=" text-[1.25rem] font-bold  text-white">{price}</p>
      </div>
    </div>
  );
}

const greens = [
  {
    image: "/home/sub-category-1.png",
    title: "Lettuce",
    price: "₹50",
  },
  {
    image: "/home/sub-category-2.png",
    title: "Spinach",
    price: "₹50",
  },
  {
    image: "/home/sub-category-3.png",
    title: "Supergreens",
    price: "₹50",
  },
  {
    image: "/home/sub-category-1.png",
    title: "Lettuce",
    price: "₹50",
  },
];

export default function GreensCarousel() {
  return (
    <section className="py-16 overflow-hidden">
      <Carousel opts={{ align: "start" }} className="overflow-visible">
        <CarouselContent className="-ml-6">
          {greens.map((item, i) => (
            <CarouselItem
              key={i}
              className="
                
                basis-[85%]
                sm:basis-1/2
                3xl:basis-1/3
              "
            >
              <GreensCard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
