import Image from "next/image";
import React from "react";

const logos = [
  {
    src: "/home/press-1.webp",
    alt: "Press logo 1",
    width: "w-[clamp(56px,8vw,85px)]",
    aspect: "aspect-square",
  },
  {
    src: "/home/press-2.webp",
    alt: "Press logo 2",
    width: "w-[clamp(120px,18vw,180px)]",
    aspect: "aspect-[177/60]",
  },
  {
    src: "/home/press-3.webp",
    alt: "Press logo 3",
    width: "w-[clamp(64px,9vw,95px)]",
    aspect: "aspect-square",
  },
  {
    src: "/home/press-4.webp",
    alt: "Press logo 4",
    width: "w-[clamp(72px,10vw,120px)]",
    aspect: "aspect-square",
  },
];

export default function Press() {
  return (
    <section className="bg-herbal p-4 md:p-12 lg:p-18 ">
      <div className="flex flex-col 2xl:flex-row justify-between items-center gap-10 mt-20 sm:mt-0">
        <h2 className="text-[2rem] lg:text-[3.5rem] 2xl:text-[4.75rem] font-dream-orphans tracking-[6px] uppercase text-forest">
          In The Press
        </h2>

        {/* GRID controls columns only */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-10 w-full max-w-5xl">
          {logos.map((logo, i) => (
            <div key={i} className="flex justify-center items-center">
              <div className={`relative ${logo.width} ${logo.aspect}`}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 60vw,
                         (max-width: 1024px) 40vw,
                         (max-width: 1536px) 20vw,
                         180px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
