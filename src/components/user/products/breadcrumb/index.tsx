"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductBreadcrumb({ product }: { product: Product }) {
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
          <Link className="hover:underline" href={`/categories`}>
            Products
          </Link>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem className="text-maroon capitalize">
          {product.name.toLowerCase()}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
