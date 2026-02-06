"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/common/pagination";
import { ArchiveVariant } from "../archive";
import { DeleteVariant } from "../delete";
import { CircleCheck, Info, Pencil } from "lucide-react";
import TableSkeleton from "./skeleton";
import { useVariantStore } from "@/store/admin/variant.store";
import Link from "next/link";
import { useProductDetailsStore } from "@/store/admin/productDetail.store";
export function VariantTable() {
  const {
    data: variants,
    isLoading: variantLoading,
    isFetching: variantFetching,
  } = useVariantStore();
  const {
    data: product,
    isLoading: productLoading,
    isFetching: productFetching,
  } = useProductDetailsStore();
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Is Published</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!product ||
        productLoading ||
        productFetching ||
        !variants ||
        variantFetching ||
        variantLoading ? (
          <>
            <TableSkeleton></TableSkeleton>
            <TableSkeleton></TableSkeleton>
            <TableSkeleton></TableSkeleton>
          </>
        ) : (
          <>
            {variants.data.map((variant) => (
              <TableRow key={product.publicId}>
                <TableCell className="font-medium max-w-40 truncate whitespace-nowrap">
                  {variant.publicId}
                </TableCell>

                <TableCell>{variant.name}</TableCell>
                <TableCell>{variant.sku}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {variant.isPublished ? (
                    <CircleCheck className="stroke-green-500" size={15} />
                  ) : (
                    <CircleCheck size={15} />
                  )}
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  {/* <Link href={`/admin/dashboard/product/${product.publicId}`}>
                    <Info size={15} />
                  </Link> */}
                  <Link
                    href={`/admin/dashboard/product/${product.publicId}/variant/${variant.publicId}/update`}
                  >
                    <Pencil size={15} />
                  </Link>
                  <ArchiveVariant variant={variant}></ArchiveVariant>
                  <DeleteVariant variant={variant}></DeleteVariant>
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
      <TableFooter>
        {!product ||
          productLoading ||
          productFetching ||
          !variants ||
          variantFetching ||
          (variantLoading && (
            <>
              <Pagination colSpan={5} {...variants}></Pagination>
            </>
          ))}
      </TableFooter>
    </Table>
  );
}
