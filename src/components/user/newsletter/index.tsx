import Image from "next/image";
import React from "react";
import NewsletterForm from "./form";
export default function Newsletter() {
  return (
    <section className="bg-forest px-18 py-14 flex gap-2 items-center justify-between border-b-mint border-b">
      <Image src="/logo-white.webp" height={300} width={300} alt="logo"></Image>
      <NewsletterForm></NewsletterForm>
    </section>
  );
}
