import { RecipeCardLoader } from "@/components/common/recipeCard/loading";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
export default function Loading() {
  return (
    <>
      <Breadcrumb className="absolute z-50 top-70 sm:top-5 left-5">
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
        </BreadcrumbList>
      </Breadcrumb>
      <div className="  -translate-y-5.5 ">
        <div className="w-full h-140 bg-muted rounded-xl" />

        <div className=" px-4 md:px-12 lg:px-18 pb-5 max-w-400 w-full mx-auto space-y-10 mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="border rounded-xl p-4 space-y-3">
                <div className="h-5 w-1/2 bg-muted rounded" />

                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-muted rounded" />
                ))}

                <div className="h-9 w-full bg-muted rounded-lg mt-4" />
              </div>

              <div className="border rounded-xl p-4 space-y-3">
                <div className="h-5 w-1/2 bg-muted rounded" />

                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-muted rounded" />
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 border rounded-xl p-4 space-y-4">
              <div className="h-6 w-1/3 bg-muted rounded" />

              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-5/6 bg-muted rounded" />
                </div>
              ))}

              <div className="border rounded-lg p-3 space-y-2 mt-4">
                <div className="h-4 w-1/3 bg-muted rounded" />
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-3 w-4/5 bg-muted rounded" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-80" />
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((recipe) => (
                <RecipeCardLoader key={recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
