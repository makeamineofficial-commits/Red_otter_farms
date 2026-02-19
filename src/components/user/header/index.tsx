"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Login from "../login";
import Cart from "../cart";
import { Handbag, Heart, Menu, Search } from "lucide-react";
import LocationPicker from "../location";
const pages = [
  { slug: "none", href: "/about", label: "Shop" },
  { slug: "none", href: "/recipes", label: "Our Range" },
  { slug: "none", href: "/recipes", label: "Recipes" },
  { slug: "none", href: "#", label: "Thoughtful Gifting" },
  { slug: "none", href: "#", label: "OtterWays" },
  { slug: "none", href: "/about", label: "Founder's Note" },
];

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="sticky z-90 top-0">
        <div className="bg-black p-1 px-2 flex items-center justify-end">
          <LocationPicker></LocationPicker>
        </div>
        <header className="bg-mint max-w-500  w-full  px-4 md:px-12 lg:px-18 py-4 ">
          <div className="w-full  relative flex justify-between items-center  ">
            <Link href="/">
              <div className="min-w-21  lg:w-31.5 aspect-square relative">
                <Image src="/logo-black.webp" alt="logo" fill></Image>
              </div>
            </Link>

            <nav className=" hidden xl:flex gap-4 xl:gap-6  3xl:gap-10 items-center justify-between  3xl:absolute 3xl:top-1/2 3xl:left-1/2 3xl:-translate-x-1/2 3xl:-translate-y-1/2">
              {pages.map((ele) => {
                return (
                  <Link
                    key={ele.slug}
                    href={ele.href}
                    className="uppercase text-nowrap text-[1rem]"
                  >
                    {ele.label}
                  </Link>
                );
              })}
            </nav>

            <nav className="flex gap-2 xl:gap-4  3xl:gap-7 items-center ">
              <Link href="/categories?action=search">
                <Search
                  className="stroke-1 stroke-red-500  hidden lg:block lg:size-9"
                  stroke="1"
                />
              </Link>
              <Link href="/account/wishlist">
                <Heart
                  className="stroke-1 stroke-red-500 hidden lg:block lg:size-9 "
                  stroke="0.01"
                />
              </Link>
              <Login></Login>
              <Cart></Cart>
              <button onClick={() => setOpen(true)}>
                <Menu className="stroke-1 stroke-red-500 block size-8 lg:hidden lg:size-9 "></Menu>
              </button>
            </nav>
          </div>
        </header>
      </div>

      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          className="bg-black/30 fixed top-0 left-0 z-90 h-screen w-screen"
        ></div>
      )}
      <aside
        className={`fixed h-screen top-0 left-0 z-100 shadow-2xl transition-all duration-300 ${isOpen ? "w-72" : "w-0"} bg-white overflow-hidden`}
      >
        <div className="p-4 space-y-12">
          <div className="w-21  aspect-square relative">
            <Image src="/logo-black.webp" alt="logo" fill></Image>
          </div>

          <div className="flex flex-col gap-4 ">
            {pages.map((ele) => {
              return (
                <Link
                  key={ele.slug}
                  href={`#`}
                  className="uppercase text-nowrap text-sm"
                >
                  {ele.label}
                </Link>
              );
            })}
          </div>

          <div className="flex gap-4 ">
            <Link href="/categories?action=search">
              <Search
                className="stroke-1 stroke-red-500  block lg:size-9"
                stroke="1"
              />
            </Link>
            <Link href="/account/wishlist">
              <Heart
                className="stroke-1 stroke-red-500 block lg:size-9 "
                stroke="0.01"
              />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
