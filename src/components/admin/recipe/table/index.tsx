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
import { useRecipeStore } from "@/store/admin/recipe.store";
import { Pagination } from "@/components/common/pagination";

import { ArchiveRecipe } from "../archive";
import { DeleteRecipe } from "../delete";
import { CircleCheck, Pencil } from "lucide-react";
import TableSkeleton from "./skeleton";
import Link from "next/link";
export function RecipeTable() {
  const { data, isLoading, isFetching } = useRecipeStore();

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ID</TableHead>
          <TableHead>Title</TableHead>
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
            {data.data.map((recipe) => (
              <TableRow key={recipe.publicId}>
                <TableCell className="font-medium max-w-40 truncate whitespace-nowrap">
                  {recipe.publicId}
                </TableCell>
                <TableCell className="font-medium max-w-96 truncate whitespace-nowrap">
                  {recipe.title}
                </TableCell>
                <TableCell>{recipe.slug}</TableCell>
                <TableCell>
                  {recipe.isPublished ? (
                    <CircleCheck className="stroke-green-500" size={15} />
                  ) : (
                    <CircleCheck size={15} />
                  )}
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Link href={`/admin/dashboard/recipe/${recipe.publicId}/update`}>
                    <Pencil size={15} />
                  </Link>
                  <ArchiveRecipe recipe={recipe}></ArchiveRecipe>
                  <DeleteRecipe recipe={recipe}></DeleteRecipe>
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
