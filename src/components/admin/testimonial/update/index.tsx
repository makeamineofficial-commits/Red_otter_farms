"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UpdateTestimonialForm from "./form";
import { Pencil } from "lucide-react";
import { Testimonial } from "@/types/testimonial";

export function UpdateTestimonial({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil size={15} />
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:min-w-200 overflow-auto max-h-[95%]">
        <DialogHeader>
          <DialogTitle>Update Testimonial</DialogTitle>
        </DialogHeader>
        <UpdateTestimonialForm testimonial={testimonial} />
      </DialogContent>
    </Dialog>
  );
}
