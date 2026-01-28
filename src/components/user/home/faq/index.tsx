import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function FAQ() {
  return (
    <section
      className="bg-mint grid  grid-cols-1 
  xl:grid-cols-[700px_1fr] gap-0 xl:gap-18 p-4 md:p-12 lg:p-18"
    >
      <div className="relative hidden xl:block xl:h-212.5 ">
        <Image src="/home/faq.webp" alt="" fill className="object-cover" />
      </div>

      <article className=" py-10 xl:py-16 space-y-0 xl:space-y-6  ">
        <h1 className="text-[2rem] lg:text-[3.5rem] 2xl:text-[4.75rem] font-dream-orphans font-normal uppercase  leading-none gap-2 text-forest tracking-[6px] text-center xl:text-left">
          FAQ's
        </h1>
        <br />
        <br className="xl:block hidden" />
        <Accordion
          type="multiple"
          // type="single"
          // collapsible
          // defaultValue="item-1"
          className=""
        >
          <AccordionItem
            value="item-1"
            className="border-b border-b-forest data-[state=open]:bg-herbal p-0 px-4! xl:p-4 xl:px-10!"
          >
            <AccordionTrigger className="text-[1.25rem] xl:text-[1.725rem] font-light tracking-[1.42px] w-full">
              Where does your produce come from?
            </AccordionTrigger>
            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1rem] xl:text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite — and so do picky eaters.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border-b border-b-forest data-[state=open]:bg-herbal p-0 px-4! xl:p-4 xl:px-10!"
          >
            <AccordionTrigger className="text-[1.25rem] xl:text-[1.725rem] font-light tracking-[1.42px] w-full">
              Is your produce organic?
            </AccordionTrigger>

            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1rem] xl:text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border-b border-b-forest data-[state=open]:bg-herbal p-0 px-4! xl:p-4 xl:px-10!"
          >
            <AccordionTrigger className="text-[1.25rem] xl:text-[1.725rem] font-light tracking-[1.42px] w-full">
              How fresh is the produce when it arrives?
            </AccordionTrigger>

            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1rem] xl:text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="border-b border-b-forest data-[state=open]:bg-herbal p-0 px-4! xl:p-4 xl:px-10!"
          >
            <AccordionTrigger className="text-[1.25rem] xl:text-[1.725rem] font-light tracking-[1.42px] w-full">
              What is included in a weekly box?
            </AccordionTrigger>

            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1rem] xl:text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="border-b border-b-forest data-[state=open]:bg-herbal p-0 px-4! xl:p-4 xl:px-10!"
          >
            <AccordionTrigger className="text-[1.25rem] xl:text-[1.725rem] font-light tracking-[1.42px] w-full">
              Can I customise my box?
            </AccordionTrigger>

            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1rem] xl:text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-6"
            className="border-b border-b-forest data-[state=open]:bg-herbal p-0 px-4! xl:p-4 xl:px-10!"
          >
            <AccordionTrigger className="text-[1.25rem] xl:text-[1.725rem] font-light tracking-[1.42px] w-full">
              Do you offer subscriptions?
            </AccordionTrigger>

            <AccordionContent className="w-full max-h-40 overflow-y-auto text-[1rem] xl:text-[1.375rem] font-light  text-wrap">
              Nutrient-dense greens, naturally sweet carrots, rotis that digest
              easier. When food is grown right and reaches you fast, you notice
              it in the first bite.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </article>
    </section>
  );
}
