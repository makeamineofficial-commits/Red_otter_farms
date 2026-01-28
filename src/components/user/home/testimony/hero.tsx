import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <article className="flex gap-8 flex-col">
      <h2 className="uppercase tracking-[4.2px] text-[1.125rem]">
        Testimonials
      </h2>
      <h1 className="text-forest font-dream-orphans uppercase flex flex-col gap-5 leading-[100%] text-[2rem] lg:text-[3.5rem] 2xl:text-[4.75rem] tracking-[6px]">
        <span>Trusted by</span>
        <span>8,000+ homes</span>
      </h1>
      <p className="text-[1rem] md:text-[1.125rem] xl:text-[1.375rem] hidden md:flex flex-col gap-2 ">
        <span>We don't ask you to trust a label. </span>
        <span> We ask you to trust a system.</span>
        <span>One you can see, test, and taste.</span>
      </p>

      <p className="text-[1rem] md:text-[1.125rem] block md:hidden ">
        We don't ask you to trust a label. We ask you to trust a system. One you
        can see, test, and taste.
      </p>

      <div className="flex flex-row md:flex-col xl:flex-row gap-4 lg:gap-12">
        <div className="flex flex-col gap-4">
          <div className="w-12.5 md:w-15 xl:w-17.5 aspect-square relative">
            <Image src="/home/chemical-free.png" fill alt=""></Image>
          </div>
          <h2 className="text-[1rem] md:text-[1.25rem] uppercase font-bold tracking-[4.27px]">
            Chemical-Free.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="w-12.5 md:w-15 xl:w-17.5 aspect-square relative">
            <Image src="/home/lab-tested.png" fill alt=""></Image>
          </div>
          <h2 className="text-[1rem] md:text-[1.25rem] uppercase font-bold tracking-[4.27px]">
            Lab-Tested.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="w-12.5 md:w-15 xl:w-17.5 aspect-square relative">
            <Image src="/home/delivery.png" fill alt=""></Image>
          </div>
          <h2 className="text-[1rem] md:text-[1.25rem] uppercase font-bold tracking-[4.27px]">
            Delivered in 36h.
          </h2>
        </div>
      </div>
      <Button
        variant={"destructive"}
        className="uppercase w-58! h-18! text-[1.25rem] font-semibold rounded-3xl! hidden lg:block"
      >
        LEARN MORE
      </Button>
    </article>
  );
}
