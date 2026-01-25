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
import { useParams } from "next/navigation";

export default function CategoryBreadcrumb() {
  const { slug } = useParams();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* First fixed node */}
        <BreadcrumbItem>
          <Link className="hover:underline" href="/">
            Home
          </Link>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link className="hover:underline" href="/categories">
            Categories
          </Link>
        </BreadcrumbItem>

        {slug ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-maroon capitalize">
              {slug.toString().replace(/-/g, " ")}
            </BreadcrumbItem>
          </>
        ) : (
          <></>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
