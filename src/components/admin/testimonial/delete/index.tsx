"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useDeleteTestimonial } from "@/hooks/admin/testimonial.hook";
import { Loader2, Trash2 } from "lucide-react";

import { Testimonial } from "@/types/testimonial";

export function DeleteTestimonial({ testimonial }: { testimonial: Testimonial }) {
  const [open, setOpen] = React.useState(false);
  const { publicId } = testimonial;
  const { mutateAsync, isPending } = useDeleteTestimonial();
  const handleAction = async () => {
    await mutateAsync({ publicId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2 size={15} className="stroke-red-500"></Trash2>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Testimonial</DialogTitle>
          <DialogDescription>
            This will permanently remove the testimonial from your app. These
            actions are irreversible. Please choose carefully.
          </DialogDescription>
        </DialogHeader>

        <Button
          variant="default"
          className="w-full"
          disabled={isPending}
          onClick={() => handleAction()}
        >
          {isPending ? (
            <Loader2 className="animate-spin duration-200" />
          ) : (
            "Delete Testimonial"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
