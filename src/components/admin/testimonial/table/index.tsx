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
import { UpdateTestimonial } from "../update";
import { ArchiveTestimonial } from "../archive";
import { DeleteTestimonial } from "../delete";
import { CircleCheck } from "lucide-react";
import TableSkeleton from "./skeleton";
import { useTestimonialStore } from "@/store/admin/testimonial.store";
export function TestimonialTable() {
  const { data, isLoading, isFetching } = useTestimonialStore();

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ID</TableHead>
          <TableHead>Review</TableHead>
          <TableHead>By</TableHead>
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
            {data.data.map((testimonial) => (
              <TableRow key={testimonial.publicId}>
                <TableCell className="font-medium max-w-40 truncate whitespace-nowrap">
                  {testimonial.publicId}
                </TableCell>

                <TableCell className="font-medium max-w-100 truncate whitespace-nowrap">
                  {testimonial.review}
                </TableCell>
                <TableCell>{testimonial.name}</TableCell>
                <TableCell>{testimonial.slug}</TableCell>
                <TableCell>
                  {testimonial.isPublished ? (
                    <CircleCheck className="stroke-green-500" size={15} />
                  ) : (
                    <CircleCheck size={15} />
                  )}
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <UpdateTestimonial
                    testimonial={testimonial}
                  ></UpdateTestimonial>
                  <ArchiveTestimonial
                    testimonial={testimonial}
                  ></ArchiveTestimonial>
                  <DeleteTestimonial
                    testimonial={testimonial}
                  ></DeleteTestimonial>
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
