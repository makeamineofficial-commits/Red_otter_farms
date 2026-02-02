import { Button } from "@/components/ui/button";
import Image from "next/image";
import GreensCarousel from "./carousel";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Salads2() {
  return (
    <section className="px-4 md:px-12 lg:px-18 py-10 sm:py-16 lg:py-24 bg-forest text-white">
      <div className="flex items-stretch gap-12">
        {/* TEXT */}
        <article className="flex-1 min-w-0">
          <div className="flex gap-2 md:gap-8 flex-col">
            <h2 className="uppercase tracking-[4.2px] text-[1.125rem]">
              Explore Category
            </h2>

            <div className="flex items-center">
              <h1 className="font-dream-orphans uppercase flex flex-col  text-[2rem] lg:text-[3.5rem] 2xl:text-[4.75rem] tracking-[6px]">
                Salad greens that stay crisp
              </h1>
              <div className=" flex gap-4">
                <CarouselPrevious className="static bg-transparent size-12.5! border-white text-white  hover:bg-white! hover:text-forest hover:opacity-90`" />
                <CarouselNext className="static bg-transparent size-12.5! border-white text-white hover:bg-white! hover:text-forest  hover:opacity-90`" />
              </div>
            </div>

            <p className="max-w-176 opacity-80 my-4 md:my-10 text-justify  text-[1rem] lg:text-[1.375rem]">
              Salad greens are the hardest produce to get right because they’re
              eaten raw. They wilt quickly and pick up whatever they’re exposed
              to along the way. That’s why we control the journey from harvest
              to delivery - so the greens arrive intact, without leaving you to
              second-guess what you're feeding your family.
            </p>

            <div>
              <Button className="bg-white! w-fit! uppercase hover:text-red-500 font-bold  lg:w-auto! sm:px-6! lg:px-10! h-14! lg:h-18! rounded-2xl! text-[1rem] lg:text-[1.175rem]! tracking-[1.42px]! text-red-500">
                Shop All Salads
              </Button>
            </div>
          </div>

          <div>
            <GreensCarousel></GreensCarousel>
          </div>
        </article>

        {/* IMAGE */}
        <article className="relative hidden xl:block shrink-0 w-162.5 h-full aspect-3/4">
          <Image
            src="/home/category-1.png"
            alt="Salad greens"
            fill
            className="object-contain"
            priority
          />
        </article>
      </div>
    </section>
  );
}
