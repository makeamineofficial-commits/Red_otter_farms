"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Login from "../login";
import Cart from "../cart";
import { Handbag, Heart, Menu, Search } from "lucide-react";
const pages = [
  { slug: "salads", label: "The Salads World" },
  { slug: "none", label: "Convenience & Delivery" },
  { slug: "soup", label: "Soup Kit" },
  { slug: "flour-grains", label: "Flour & Grains" },
  { slug: "sweetener", label: "Sweeteners" },
];

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <header className="bg-mint max-w-500 fixed z-50 w-full top-0 px-4 md:px-12 lg:px-18 py-4 ">
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
                  href={`#`}
                  className="uppercase text-nowrap text-[1.25rem]"
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
            <Link href="/wishlist">
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
            <Link href="/wishlist">
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
