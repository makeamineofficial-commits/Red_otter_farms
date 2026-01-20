import Image from "next/image";
import React from "react";

export default function Working() {
  return (
    <section className="bg-mint py-30 flex flex-col items-center gap-18">
      <h2 className="font-dream-orphans text-forest text-[4.75rem] font-light uppercase">
        How Red Otter works
      </h2>

      <article className="grid grid-cols-4 gap-7.5">
        <div className="border border-black  w-105">
          <Image
            width={420}
            height={360}
            src="/home/working-1.webp"
            alt="working"
          ></Image>
          <div className="flex gap-3 flex-col px-8 py-5">
            <h2 className="uppercase font-semibold text-[1.5rem]">Harvest</h2>
            <p className="text-[1.375rem] font-light">
              Produce is harvested fresh from our partner farms.
            </p>
          </div>
        </div>

        <div className="border border-black  w-105">
          <Image
            width={420}
            height={360}
            src="/home/working-2.webp"
            alt="working"
          ></Image>
          <div className="flex gap-3 flex-col px-8 py-5">
            <h2 className="uppercase font-semibold text-[1.5rem]">Pack</h2>
            <p className="text-[1.375rem] font-light">
              Cleaned and packed carefully to retain freshness.
            </p>
          </div>
        </div>
        <div className="border border-black  w-105">
          <Image
            width={420}
            height={360}
            src="/home/working-1.webp"
            alt="working"
          ></Image>
          <div className="flex gap-3 flex-col px-8 py-5">
            <h2 className="uppercase font-semibold text-[1.5rem]">Deliver</h2>
            <p className="text-[1.375rem] font-light">
              Delivered quickly to ensure peak quality.
            </p>
          </div>
        </div>
        <div className="border border-black  w-105">
          <Image
            width={420}
            height={360}
            src="/home/working-1.webp"
            alt="working"
          ></Image>
          <div className="flex gap-3 flex-col px-8 py-5">
            <h2 className="uppercase font-semibold text-[1.5rem]">Repeat</h2>
            <p className="text-[1.375rem] font-light">
              Flexible subscriptions for consistent, healthy eating.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
