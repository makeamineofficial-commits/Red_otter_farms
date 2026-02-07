"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Recipe } from "@/types/recipe";

export default function RecipeBreadcrumb({
  recipe,
}: {
  recipe: Recipe & { recipeSaved: boolean };
}) {
  return (
    <Breadcrumb className="absolute  z-50 top-70 sm:top-5 left-5">
      <BreadcrumbList>
        {/* First fixed node */}
        <BreadcrumbItem className="text-white">
          <Link className="hover:underline" href="/">
            Home
          </Link>
        </BreadcrumbItem>

        <BreadcrumbSeparator className="text-white" />
        <BreadcrumbItem className="text-white">
          <Link className="hover:underline" href="/recipes">
            Recipe
          </Link>
        </BreadcrumbItem>

        <BreadcrumbSeparator className="text-white" />
        <BreadcrumbItem className="text-white">{recipe.title}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
