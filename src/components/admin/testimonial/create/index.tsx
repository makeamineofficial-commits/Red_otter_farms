"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateTestimonialForm from "./form";
import { Button } from "@/components/ui/button";

export default function CreateTestimonial() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Testimonial</Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:min-w-200 overflow-auto max-h-[95%]">
        <DialogHeader>
          <DialogTitle>Create New Testimonial</DialogTitle>
        </DialogHeader>
        <CreateTestimonialForm />
      </DialogContent>
    </Dialog>
  );
}
