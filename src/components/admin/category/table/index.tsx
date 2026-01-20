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
import { useCategoryStore } from "@/store/admin/category.store";
import { Pagination } from "@/components/common/pagination";
import { UpdateCategory } from "../update";
import { ArchiveCategory } from "../archive";
import { DeleteCategory } from "../delete";
import { CircleCheck } from "lucide-react";
import TableSkeleton from "./skeleton";
export function CategoryTable() {
  const { data, isLoading, isFetching } = useCategoryStore();

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
          </>
        ) : (
          <>
            {data.data.map((category) => (
              <TableRow key={category.publicId}>
                <TableCell className="font-medium max-w-40 truncate whitespace-nowrap">
                  {category.publicId}
                </TableCell>

                <TableCell>{category.name}</TableCell>
                <TableCell>{category.displayName}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>
                  {category.isPublished ? (
                    <CircleCheck className="stroke-green-500" size={15} />
                  ) : (
                    <CircleCheck size={15} />
                  )}
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <UpdateCategory category={category}></UpdateCategory>
                  <ArchiveCategory category={category}></ArchiveCategory>
                  <DeleteCategory category={category}></DeleteCategory>
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
