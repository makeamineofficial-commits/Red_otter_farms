"use client";

import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";
import { Home, Package, Folder, FileText, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

import { useCallback } from "react";
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
        "group relative flex items-center gap-3 rounded-lg px-3 py-2",
        "transition-all duration-200 outline-none",
        active
          ? "bg-muted text-foreground font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        disable && "pointer-events-none opacity-50",
        className,
      )}
    >
      {/* Active indicator */}
      {active && (
        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-primary" />
      )}

      {/* Icon */}
      <span
        className={clsx(
          "flex h-9 w-9 items-center justify-center rounded-md",
          active
            ? "bg-primary/10 text-primary"
            : "bg-muted/50 text-muted-foreground group-hover:text-foreground",
        )}
      >
        {icon}
      </span>

      {/* Label */}
      <span className="text-sm whitespace-nowrap">{children}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = useCallback(
    (path: string) => pathname.startsWith(path),
    [pathname],
  );

  return (
    <aside className="h-full w-64 border-r bg-background">
      <div className="flex flex-col gap-1 p-3">
        <NavItem
          icon={<Folder size={18} />}
          href="/admin/dashboard/category"
          active={isActive("/admin/dashboard/category")}
        >
          Category
        </NavItem>

        <NavItem
          icon={<Package size={18} />}
          href="/admin/dashboard/product"
          active={isActive("/admin/dashboard/product")}
        >
          Product
        </NavItem>

        <NavItem
          icon={<FileText size={18} />}
          href="/admin/dashboard/recipe"
          active={isActive("/admin/dashboard/recipe")}
        >
          Recipe
        </NavItem>

        <NavItem
          icon={<ShoppingCart size={18} />}
          href="/admin/dashboard/order"
          active={isActive("/admin/dashboard/order")}
        >
          Order
        </NavItem>
      </div>
    </aside>
  );
}
