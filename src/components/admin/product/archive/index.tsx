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
import { Product } from "@/types/product";

export function ArchiveProduct({ product }: { product: Product }) {
  const [open, setOpen] = React.useState(false);
  const { publicId, isPublished } = product;
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
            {isPublished ? "Archive Product" : "Publish Product"}
          </DialogTitle>
          <DialogDescription>
            {isPublished ? (
              <>
                This will archive the product from your app. This action can
                have direct effect on your app. Please choose carefully.
              </>
            ) : (
              <>
                This will publish the product to your app. This action can have
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
            <>{isPublished ? "Archive Product" : "Publish Product"}</>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
