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
          <Link
            href="https://wa.me/919354808527"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            Contact Us
          </Link>
          <Link href="https://www.instagram.com/redotterfarms/">Instagram</Link>
          <Link href="https://www.facebook.com/redotterfarms">Facebook</Link>
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
          <Link href="/account">My Account</Link>
          <Link href="#">Manage Subscription</Link>
          <Link href="#">Help & Support</Link>
          <Link href="#">Affiliate Program</Link>
          <Link
            href="https://wa.me/919354808527"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            Contact
          </Link>
          <Link href="/terms-conditions">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/refund">Return & Refund Policy</Link>
        </ul>
      </div>
    </footer>
  );
}
