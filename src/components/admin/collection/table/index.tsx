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
import { useCollectionStore } from "@/store/admin/collection.store";
import { Pagination } from "@/components/common/pagination";
import { UpdateCollection } from "../update";
import { ArchiveCollection } from "../archive";
import { DeleteCollection } from "../delete";
import { CircleCheck } from "lucide-react";
import TableSkeleton from "./skeleton";
export function CollectionTable() {
  const { data, isLoading, isFetching } = useCollectionStore();

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
            {data.data.map((collection) => (
              <TableRow key={collection.publicId}>
                <TableCell className="font-medium max-w-40 truncate whitespace-nowrap">
                  {collection.publicId}
                </TableCell>

                <TableCell>{collection.name}</TableCell>
                <TableCell>{collection.displayName}</TableCell>
                <TableCell>{collection.slug}</TableCell>
                <TableCell>
                  {collection.isPublished ? (
                    <CircleCheck className="stroke-green-500" size={15} />
                  ) : (
                    <CircleCheck size={15} />
                  )}
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <UpdateCollection collection={collection}></UpdateCollection>
                  <ArchiveCollection
                    collection={collection}
                  ></ArchiveCollection>
                  <DeleteCollection collection={collection}></DeleteCollection>
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
