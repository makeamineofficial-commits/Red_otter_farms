import { ProductCardLoader } from "@/components/common/productCard/loading";
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
      <Breadcrumb>
        <BreadcrumbList>
          {/* First fixed node */}
          <BreadcrumbItem>
            <Link className="hover:underline" href="#">
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
      <section className="flex gap-12 items-start justify-center  flex-col lg:flex-row ">
        <article className="w-full hidden sm:block">
          <div className="aspect-square bg-muted relative rounded-3xl overflow-hidden">
            <div className=" w-full h-full bg-muted" />
          </div>

          <div className="grid grid-cols-3 my-2 lg:my-4.5 gap-2 lg:gap-4.5">
            {[1, 2, 3].map(() => {
              return (
                <button
                  className="
            aspect-square rounded-3xl overflow-hidden relative
            bg-muted group cursor-pointer
            focus:outline-none
          "
                >
                  <div className=" w-full h-full bg-muted" />
                </button>
              );
            })}
          </div>
        </article>
        <article className="w-full sm:hidden block relative space-y-5">
          <div className="aspect-square bg-muted relative rounded-3xl overflow-hidden ">
            <div className=" w-full h-full bg-muted" />
          </div>
        </article>
        <article className="w-full xl:min-w-150 space-y-4 ">
          <div className="h-4 w-24 bg-muted rounded" />

          <div className="h-6 w-40 bg-muted rounded" />

          <div className="h-10 w-full max-w-100 bg-muted rounded" />

          <div className="h-5 w-full max-w-87.5 bg-muted rounded" />

          <div className="mt-4 flex items-center gap-4">
            <div className="h-8 w-16 bg-muted rounded" />
            <div className="h-6 w-12 bg-muted rounded" />
          </div>

          <div className="h-10 w-full bg-muted rounded mt-4" />

          <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
            <div className="h-14 w-full sm:w-24 bg-muted rounded" />
            <div className="h-14 w-full sm:flex-1 bg-muted rounded" />
          </div>

          <div className="h-14 w-full bg-muted rounded mt-3" />

          <div className="bg-muted flex items-center gap-3 p-3 rounded-md mt-3">
            <div className="h-8 w-8 bg-muted rounded-full" />
            <div className="flex flex-col gap-1 w-full">
              <div className="h-3 w-20 bg-muted rounded" />
              <div className="h-2 w-32 bg-muted rounded" />
            </div>
          </div>

          <div className="border-2 border-muted p-3 rounded-md mt-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 bg-muted rounded-full" />
              <div className="h-4 w-24 bg-muted rounded" />
            </div>
            <ul className="flex flex-col gap-2 mt-2">
              <li className="h-3 w-32 bg-muted rounded" />
              <li className="h-3 w-40 bg-muted rounded" />
              <li className="h-3 w-36 bg-muted rounded" />
            </ul>
          </div>

          <div className="h-4 w-full max-w-100 bg-muted rounded mt-3" />

          <div className="flex items-center gap-2 mt-4">
            <div className="h-5 w-5 bg-muted rounded-full" />
            <div className="h-4 w-40 bg-muted rounded" />
          </div>
        </article>
      </section>
      <section className="space-y-5">
        <h2 className="font-bold text-[1.25rem]">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {Array.from([1, 2, 3])?.map((product) => (
            <ProductCardLoader key={product}></ProductCardLoader>
          ))}
        </div>
      </section>
    </>
  );
}
