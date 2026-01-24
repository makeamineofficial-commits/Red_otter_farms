"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type AccountBreadcrumbProps = {
  children?: React.ReactNode;
};

export default function AccountBreadcrumb({
  children,
}: AccountBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* First fixed node */}
        <BreadcrumbItem>
          <Link className="hover:underline" href="/account">
            Account
          </Link>
        </BreadcrumbItem>

        {/* Dynamic next nodes */}
        {children && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-maroon">{children}</BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
