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
import { useProductStore } from "@/store/user/product.store";

export default function ProductBreadcrumb() {
  const { data, isLoading, isFetching } = useProductStore();

  if (!data || isFetching || isLoading)
    return (
      <>
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
              <Link className="hover:underline" href="#">
                Products
              </Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </>
    );
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
          <Link className="hover:underline" href="#">
            Products
          </Link>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem className="text-maroon">{data.name}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
