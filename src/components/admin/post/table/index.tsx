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
import { usePostStore } from "@/store/admin/post.store";
import { Pagination } from "@/components/common/pagination";

import { ArchivePost } from "../archive";
import { DeletePost } from "../delete";
import { CircleCheck, Pencil } from "lucide-react";
import TableSkeleton from "./skeleton";
import Link from "next/link";
export function PostTable() {
  const { data, isLoading, isFetching } = usePostStore();

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
            {data.data.map((post) => (
              <TableRow key={post.publicId}>
                <TableCell className="font-medium max-w-40 truncate whitespace-nowrap">
                  {post.publicId}
                </TableCell>
                <TableCell className="font-medium max-w-96 truncate whitespace-nowrap">
                  {post.title}
                </TableCell>
                <TableCell>{post.slug}</TableCell>
                <TableCell>
                  {post.isPublished ? (
                    <CircleCheck className="stroke-green-500" size={15} />
                  ) : (
                    <CircleCheck size={15} />
                  )}
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Link href={`/admin/dashboard/post/${post.publicId}/update`}>
                    <Pencil size={15} />
                  </Link>
                  <ArchivePost post={post}></ArchivePost>
                  <DeletePost post={post}></DeletePost>
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
