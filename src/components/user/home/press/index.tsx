import Image from "next/image";
import React from "react";

export default function Press() {
  return (
    <section className="bg-herbal p-18 flex justify-between items-center">
      <h2 className="text-[4.75rem] font-dream-orphans tracking-[6px] uppercase text-forest">
        In The Press
      </h2>

      <div className=" space-x-32">
        <Image
          className="inline-flex"
          src="/home/press-1.webp"
          alt=""
          height={85}
          width={85}
        ></Image>
        <Image
          className="inline-flex"
          src="/home/press-2.webp"
          alt=""
          height={60}
          width={177}
        ></Image>
        <Image
          className="inline-flex"
          src="/home/press-3.webp"
          alt=""
          height={93}
          width={93}
        ></Image>
        <Image
          className="inline-flex"
          src="/home/press-4.webp"
          alt=""
          height={116}
          width={116}
        ></Image>
      </div>
    </section>
  );
}
