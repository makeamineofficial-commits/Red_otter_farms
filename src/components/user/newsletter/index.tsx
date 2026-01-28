import Image from "next/image";
import React from "react";
import NewsletterForm from "./form";
export default function Newsletter() {
  return (
    <section className="bg-forest px-4 md:px-12 lg:px-18 py-14 flex md:flex-row flex-col gap-10 md:gap-2 items-center justify-between border-b-mint border-b">
      <div className="min-w-60 lg:min-w-75 xl:min-w-65 3xl:min-w-75 aspect-square relative">
        <Image src="/logo-white.webp" alt="logo" fill></Image>
      </div>
      <NewsletterForm></NewsletterForm>
    </section>
  );
}
