import Image from "next/image";
import Link from "next/link";
import React from "react";
import Login from "../login";
import Cart from "../cart";
import { Handbag, Heart, Search } from "lucide-react";
const collections = [
  { slug: "salads", label: "The Salads World" },
  { slug: "", label: "Convenience & Delivery" },
  { slug: "soup", label: "Soup Kit" },
  { slug: "flour-grains", label: "Flour & Grains" },
  { slug: "sweetener", label: "Sweeteners" },
];

export default function Header() {
  return (
    <header className="bg-mint max-w-500 fixed z-50 w-full top-0 px-18 py-4 ">
      <div className="w-full  relative flex justify-between items-center">
        <Image
          src="/logo-black.webp"
          alt="logo"
          height={125}
          width={125}
        ></Image>

        <nav className="flex gap-10 items-center justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {collections.map((ele) => {
            return (
              <>
                <Link
                  href={`/collections/${ele.slug}`}
                  className="uppercase text-nowrap text-[1.25rem]"
                >
                  {ele.label}
                </Link>
              </>
            );
          })}
        </nav>

        <nav className="flex gap-7 items-center ">
          <Link href="/categories?action=search">
            <Search className="stroke-1 stroke-red-500  size-9" stroke="1" />
          </Link>
          <Link href="/wishlist">
            <Heart className="stroke-1 stroke-red-500 size-9 " stroke="0.01" />
          </Link>
          <Login></Login>
          <Cart></Cart>
        </nav>
      </div>
    </header>
  );
}
