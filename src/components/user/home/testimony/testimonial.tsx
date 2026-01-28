import Image from "next/image";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type TestimonialCardProps = {
  image: string;
  quote: string;
  name: string;
  role: string;
  rating?: number;
};

function TestimonialCard({
  image,
  quote,
  name,
  role,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div className="border border-forest flex flex-col w-full overflow-hidden">
      {/* Image */}
      <div className="relative w-full aspect-4/3 overflow-hidden">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col gap-6">
        {/* Rating */}
        <div className="flex gap-1 text-[#F5AAA3]">
          {Array.from({ length: rating }).map((_, i) => (
            <Star
              key={i}
              size={20}
              fill="currentColor"
              className="stroke-forest"
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-[1.125rem]  leading-relaxed">“{quote}”</p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image
              src="/home/testimonial-avatar.png"
              alt={name}
              width={40}
              height={40}
            />
          </div>

          <div className="text-sm">
            <p className="font-semibold uppercase tracking-wide">{name}</p>
            <p className="opacity-70">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    image: "/home/testimonial-1.png",
    quote:
      "The greens actually taste like something. No wilting, no slime, just real food.",
    name: "Priya Sharma",
    role: "Home cook, Bangalore",
  },
  {
    image: "/home/testimonial-2.png",
    quote:
      "I switched from supermarkets because I wanted to know where my food comes from.",
    name: "Priya Sharma",
    role: "Home cook, Bangalore",
  },
  {
    image: "/home/testimonial-1.png",
    quote:
      "You can feel the difference in freshness the moment you start cooking.",
    name: "Priya Sharma",
    role: "Home cook, Bangalore",
  },
];
export default function Testimonial() {
  return (
    <section className="w-full max-w-3xl ">
      <Carousel opts={{ align: "start" }} className="overflow-visible">
        <CarouselContent className="-ml-6">
          {testimonials.map((t, i) => (
            <CarouselItem key={i} className="basis-[85%] md:basis-1/2">
              <TestimonialCard {...t} />
            </CarouselItem>
          ))}
          <CarouselItem
            key={"gap"}
            className="basis-0 md:basis-1/2"
          ></CarouselItem>
        </CarouselContent>

        {/* Bottom controls */}
        <div className="flex md:justify-start justify-center  gap-6 mt-12 ">
          <CarouselPrevious className="static bg-transparent! size-12.5! border-forest text-forest hover:bg-forest hover:text-mint" />
          <CarouselNext className="static bg-transparent! size-12.5! border-forest text-forest hover:bg-forest hover:text-mint" />
        </div>
      </Carousel>
    </section>
  );
}
