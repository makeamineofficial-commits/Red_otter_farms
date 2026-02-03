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

import { Archive, Loader2, ArchiveRestore } from "lucide-react";

import { useArchiveTestimonial } from "@/hooks/admin/testimonial.hook";
import { Testimonial } from "@/types/testimonial";

export function ArchiveTestimonial({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const [open, setOpen] = React.useState(false);
  const { publicId, isPublished } = testimonial;
  const { mutateAsync, isPending } = useArchiveTestimonial();
  const handleAction = async () => {
    await mutateAsync({ publicId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          {isPublished ? (
            <>
              <Archive size={15} className="stroke-red-500" />
            </>
          ) : (
            <>
              <ArchiveRestore size={15} className=""></ArchiveRestore>
            </>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isPublished ? "Archive Category" : "Publish Category"}
          </DialogTitle>
          <DialogDescription>
            {isPublished ? (
              <>
                This will archive the post from your testimonial. This action
                can have direct effect on your testimonial. Please choose
                carefully.
              </>
            ) : (
              <>
                This will publish the post to your testimonial. This action can
                have direct effect on your testimonial. Please choose carefully.
              </>
            )}
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
            <>{isPublished ? "Archive Category" : "Publish Category"}</>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
