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
import { ArchiveProduct } from "../archive";
import { DeleteProduct } from "../delete";
import { CircleCheck, Info, Pencil, Option, Container } from "lucide-react";
import TableSkeleton from "./skeleton";
import { useProductStore } from "@/store/admin/product.store";
import Link from "next/link";
export function ProductTable() {
  const { data, isLoading, isFetching } = useProductStore();

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Display Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Is Published</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!data || isLoading || isFetching ? (
          <>
            <TableSkeleton></TableSkeleton>
            <TableSkeleton></TableSkeleton>
            <TableSkeleton></TableSkeleton>
          </>
        ) : (
          <>
            {data.data.map((product) => (
              <TableRow key={product.publicId}>
                <TableCell className="font-medium max-w-40 truncate whitespace-nowrap">
                  {product.publicId}
                </TableCell>

                <TableCell>{product.name}</TableCell>
                <TableCell>{product.displayName}</TableCell>
                <TableCell>{product.slug}</TableCell>
                <TableCell>
                  {product.isPublished ? (
                    <CircleCheck className="stroke-green-500" size={15} />
                  ) : (
                    <CircleCheck size={15} />
                  )}
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Link href={`/products/${product.slug}`}>
                    <Info size={15} />
                  </Link>

                  <Link
                    href={`/admin/dashboard/product/${product.publicId}/variant`}
                  >
                    <Container size={15}></Container>
                  </Link>
                  <Link
                    href={`/admin/dashboard/product/${product.publicId}/update`}
                  >
                    <Pencil size={15} />
                  </Link>
                  <ArchiveProduct product={product}></ArchiveProduct>
                  <DeleteProduct product={product}></DeleteProduct>
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
      <TableFooter>
        {data && (
          <>
            <Pagination colSpan={5} {...data}></Pagination>
          </>
        )}
      </TableFooter>
    </Table>
  );
}
