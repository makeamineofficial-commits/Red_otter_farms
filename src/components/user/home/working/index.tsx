import Image from "next/image";
import React from "react";

const steps = [
  {
    title: "Harvest",
    description: "Produce is harvested fresh from our partner farms.",
    image: "/home/working-1.webp",
  },
  {
    title: "Pack",
    description: "Cleaned and packed carefully to retain freshness.",
    image: "/home/working-2.webp",
  },
  {
    title: "Deliver",
    description: "Delivered quickly to ensure peak quality.",
    image: "/home/working-3.webp",
  },
  {
    title: "Repeat",
    description: "Flexible subscriptions for consistent, healthy eating.",
    image: "/home/working-4.webp",
  },
];

export default function Working() {
  return (
    <section className="bg-herbal flex flex-col items-center gap-4 sm:gap-10 lg:gap-18 px-4 md:px-12 lg:px-18 py-10 sm:py-16 lg:py-24">
      <h2 className="font-dream-orphans text-forest text-[2rem] lg:text-[3.5rem] 2xl:text-[4.75rem] font-light uppercase">
        How Red Otter works
      </h2>

      <article className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7.5">
        {steps.map((step) => (
          <div
            key={step.title}
            className="border border-black w-full max-w-105"
          >
            {/* Image wrapper */}
            <div className="relative w-full aspect-7/6 max-h-90 overflow-hidden">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1280px) 50vw,
                       25vw"
              />
            </div>

            {/* Content */}
            <div className="flex gap-3 flex-col px-8 py-5">
              <h3 className="uppercase font-semibold text-[1.25rem] lg:text-[1.5rem]">
                {step.title}
              </h3>
              <p className="text-[1rem] md:text-[1.125rem] xl:text-[1.375rem] font-light">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
}
