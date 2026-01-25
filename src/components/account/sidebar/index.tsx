"use client";

import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";
import {
  Package,
  LayoutDashboard,
  MapPin,
  UserCircle,
  WalletIcon,
  DockIcon,
  Info,
  Shield,
  File,
  Phone,
  Users,
  Heart,
  Zap,
  MessageSquare,
  Award,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { useCallback } from "react";
import { useMenu } from "@/provider/menu.provider";

type NavItemProps = {
  children: ReactNode;
  active: boolean;
  icon: ReactNode;
  disable?: boolean;
  href: string;
  className?: string;
};

export function NavItem({
  children,
  active,
  icon,
  href,
  disable = false,
  className = "",
}: NavItemProps) {
  return (
    <Link
      href={disable ? "#" : href}
      aria-disabled={disable}
      tabIndex={disable ? -1 : 0}
      className={clsx(
        "group relative flex items-center gap-1 rounded-lg p-0.5",
        "transition-all duration-200 outline-none",
        active ? "bg-maroon text-white" : "text-black/70",
        disable && "pointer-events-none opacity-50",
        className,
      )}
    >
      {/* Icon */}
      <span
        className={clsx(
          "flex h-9 w-9 items-center justify-center rounded-md",
          active ? "text-white" : "text-black/70",
        )}
      >
        {icon}
      </span>

      {/* Label */}
      <span className="text-[0.825rem] whitespace-nowrap">{children}</span>
    </Link>
  );
}

function SidebarComponent() {
  const pathname = usePathname();

  const isActive = useCallback(
    (path: string) => pathname.startsWith(path),
    [pathname],
  );

  return (
    <>
      <div className="h-full w-60 border-r bg-background">
        <div className="p-3 space-y-2">
          <h2 className=" text-[0.65rem] text-black/70 pl-3">ACCOUNT</h2>
          <div className="flex flex-col ">
            <NavItem
              icon={<LayoutDashboard size={18} />}
              href="/account"
              active={pathname === "/account"}
            >
              Overview
            </NavItem>

            <NavItem
              icon={<UserCircle size={18} />}
              href="/account/profile"
              active={isActive("/account/profile")}
            >
              Profile
            </NavItem>

            <NavItem
              icon={<MapPin size={18} />}
              href="/account/addresses"
              active={isActive("/account/addresses")}
            >
              Addresses
            </NavItem>

            <NavItem
              icon={<WalletIcon size={18} />}
              href="/account/wallet"
              active={isActive("/account/wallet")}
            >
              Otter Wallet
            </NavItem>
            <NavItem
              icon={<DockIcon size={18} />}
              href="/account/pass"
              active={isActive("/account/pass")}
            >
              Otter Pass
            </NavItem>

            <NavItem
              icon={<Heart size={18} />}
              href="/account/wishlist"
              active={isActive("/account/wishlist")}
            >
              Wishlist / Pantry
            </NavItem>
            <NavItem
              icon={<Zap size={18} />}
              href="/quick-shop"
              active={isActive("/quick-shop")}
            >
              Quick Shop
            </NavItem>
            <NavItem
              icon={<Package size={18} />}
              href="/account/history"
              active={isActive("/account/history")}
            >
              Order History
            </NavItem>
            <NavItem
              icon={<MessageSquare size={18} />}
              href="/feedback"
              active={isActive("/feedback")}
            >
              Feedback
            </NavItem>
          </div>
        </div>

        {/*  */}

        <div className="p-3 space-y-2">
          <h2 className=" text-[0.65rem] text-black/70 pl-3 uppercase">
            Insights & Rewards
          </h2>
          <div className="flex flex-col ">
            <NavItem icon={<Award size={18} />} href="#" active={isActive("#")}>
              Loyalty Program
            </NavItem>

            <NavItem icon={<Users size={18} />} href="#" active={isActive("#")}>
              Referral Program
            </NavItem>
          </div>
        </div>

        {/*  */}

        <div className="p-3 space-y-2">
          <h2 className=" text-[0.65rem] text-black/70 pl-3 uppercase">
            COMPANY
          </h2>
          <div className="flex flex-col ">
            <NavItem
              icon={<Phone size={18} />}
              href="/contact"
              active={isActive("/contact")}
            >
              Contact Us
            </NavItem>

            <NavItem
              icon={<File size={18} />}
              href="/terms-conditions"
              active={isActive("/terms-conditions")}
            >
              Terms & Condition
            </NavItem>

            <NavItem
              icon={<Shield size={18} />}
              href="/privacy"
              active={isActive("/privacy")}
            >
              Privacy Policy
            </NavItem>

            <NavItem
              icon={<Info size={18} />}
              href="/about"
              active={isActive("/about")}
            >
              About Us
            </NavItem>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Sidebar() {
  const { isOpen, toggle } = useMenu();

  return (
    <>
      <aside className="hidden md:block no-scrollbar overflow-y-auto">
        <SidebarComponent />
      </aside>

      {isOpen && (
        <div
          onClick={() => toggle()}
          className="absolute top-0 left-0 h-screen w-screen z-90 bg-black/20"
        ></div>
      )}
      <aside
        className={`block absolute overflow-y-auto no-scrollbar top-0 left-0 z-100 bg-white h-screen pt-5 md:hidden ${isOpen ? "max-w-60" : "max-w-0"} overflow-hidden transition-all duration-200`}
      >
        <SidebarComponent />
      </aside>
    </>
  );
}
