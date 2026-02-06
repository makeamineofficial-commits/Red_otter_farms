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
import { useArchiveProduct } from "@/hooks/admin/product.hook";
import { Archive, Loader2, ArchiveRestore } from "lucide-react";
import { Variant } from "@/types/product";

export function ArchiveVariant({ variant }: { variant: Variant }) {
  const [open, setOpen] = React.useState(false);
  const { publicId, isPublished } = variant;
  const { mutateAsync, isPending } = useArchiveProduct();
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
            {isPublished ? "Archive Variant" : "Publish Variant"}
          </DialogTitle>
          <DialogDescription>
            {isPublished ? (
              <>
                This will archive the variant from your app. This action can
                have direct effect on your app. Please choose carefully.
              </>
            ) : (
              <>
                This will publish the variant to your app. This action can have
                direct effect on your app. Please choose carefully.
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
            <>{isPublished ? "Archive Variant" : "Publish Variant"}</>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
