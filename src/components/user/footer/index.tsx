import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="grid grid-cols-2 md:grid-cols-3 font-light  bg-forest text-mint">
      <div className="border-r-mint border-b-mint md:border-b-transparent border-b border-r w-full p-4 md:p-12 lg:p-18 flex flex-col gap-5 lg:gap-11">
        <h2 className="text-[1.175rem] uppercase">About Us</h2>
        <ul className="text-[1.375rem] flex flex-col">
          <Link href="#">OtterN</Link>
          <Link href="#">Convenience & Delivery</Link>
          <Link href="#">Contact Us</Link>
          <Link href="#">Instagram</Link>
          <Link href="#">Facebook</Link>
          <Link href="#">X</Link>
        </ul>
      </div>
      <div className="md:border-r-mint border-b-mint md:border-b-transparent border-r-transparent border-b border-r w-full p-4 md:p-12 lg:p-18 flex flex-col gap-5 lg:gap-11">
        <h2 className="text-[1.175rem] uppercase">Shop</h2>
        <ul className="text-[1.375rem]  flex flex-col">
          <Link href="#">The Salads World</Link>
          <Link href="#">Soup Kit</Link>
          <Link href="#">Flour & Grains</Link>
          <Link href="#">Sweeteners</Link>
        </ul>
      </div>
      <div className=" w-full p-4 md:p-12 lg:p-18 flex flex-col gap-5 lg:gap-11 col-span-2 md:col-span-1">
        <h2 className="text-[1.175rem] uppercase">Support</h2>
        <ul className="text-[1.375rem]  flex flex-col">
          <Link href="#">My Account</Link>
          <Link href="#">Manage Subscription</Link>
          <Link href="#">Help & Support</Link>
          <Link href="#">Affiliate Program</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Terms & Conditions</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Return Policy</Link>
        </ul>
      </div>
    </footer>
  );
}
