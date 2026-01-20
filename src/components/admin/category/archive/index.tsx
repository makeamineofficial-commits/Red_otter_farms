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
import { useArchiveCategory } from "@/hooks/admin/category.hook";
import { Archive, Loader2, ArchiveRestore } from "lucide-react";
import { Category } from "@/types/category";

export function ArchiveCategory({ category }: { category: Category }) {
  const [open, setOpen] = React.useState(false);
  const { publicId, isPublished } = category;
  const { mutateAsync, isPending } = useArchiveCategory();
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
                This will archive the post from your category. This action can
                have direct effect on your category. Please choose carefully.
              </>
            ) : (
              <>
                This will publish the post to your category. This action can
                have direct effect on your category. Please choose carefully.
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
