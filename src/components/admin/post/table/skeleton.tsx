import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableRow, TableCell } from "@/components/ui/table";
import { CircleCheck, Pencil, Archive, Trash2 } from "lucide-react";
export default function TableSkeleton() {
  return (
    <TableRow key={"loading"}>
      <TableCell className="font-medium  truncate whitespace-nowrap">
        <Skeleton className="h-3 w-36"></Skeleton>
      </TableCell>

      <TableCell>
        <Skeleton className="h-3 w-96"></Skeleton>
      </TableCell>

      <TableCell>
        <Skeleton className="h-3 w-40"></Skeleton>
      </TableCell>
      <TableCell>
        <CircleCheck size={15} className="opacity-40" />
      </TableCell>
      <TableCell className="flex gap-2 justify-end opacity-40">
        <Pencil size={15}></Pencil>
        <Archive size={15}></Archive>
        <Trash2 size={15}></Trash2>
      </TableCell>
    </TableRow>
  );
}
