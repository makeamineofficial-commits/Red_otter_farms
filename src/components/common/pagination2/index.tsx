"use client";

import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Suspense } from "react";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { clsx } from "clsx";
import { TableCell, TableRow } from "@/components/ui/table";

interface Props {
  colSpan: number;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  prev: number | null;
  next: number | null;
}

const PaginationComponent = ({
  page,
  limit,
  total,
  totalPages,
  prev,
  colSpan,
  next,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const goToPage = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(targetPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="my-4 flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between">
      <div className="text-xs text-muted-foreground">
        <span className="text-nowrap">
          Showing {start}-{end} out of {total}
        </span>
      </div>
      <div>
        <PaginationWrapper>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={clsx("cursor-pointer", {
                  "pointer-events-none opacity-40": !prev,
                })}
                onClick={() => prev && goToPage(prev)}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                Math.abs(pageNumber - page) <= 1
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      onClick={() => goToPage(pageNumber)}
                      isActive={pageNumber === page}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              if (pageNumber === page - 2 || pageNumber === page + 2) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                className={clsx("cursor-pointer", {
                  "pointer-events-none opacity-40": !next,
                })}
                onClick={() => next && goToPage(next)}
              />
            </PaginationItem>
          </PaginationContent>
        </PaginationWrapper>
      </div>
    </div>
  );
};

export const Pagination2 = (props: Props) => {
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <PaginationComponent {...props} />
      </Suspense>
    </>
  );
};
