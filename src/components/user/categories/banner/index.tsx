import React from "react";
import Image from "next/image";
export default function Banner() {
  return (
    <Image
      src="/collections/banner.webp"
      alt=""
      height={500}
      width={2000}
    ></Image>
  );
}
