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
import { useArchiveCollection } from "@/hooks/admin/collection.hook";
import { Archive, Loader2, ArchiveRestore } from "lucide-react";
import { Collection } from "@/types/collection";

export function ArchiveCollection({ collection }: { collection: Collection }) {
  const [open, setOpen] = React.useState(false);
  const { slug, isPublished } = collection;
  const { mutateAsync, isPending } = useArchiveCollection();
  const handleAction = async () => {
    await mutateAsync({ slug });
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
            {isPublished ? "Archive Post" : "Publish Post"}
          </DialogTitle>
          <DialogDescription>
            {isPublished ? (
              <>
                This will archive the post from your collection. This action can
                have direct effect on your collection. Please choose carefully.
              </>
            ) : (
              <>
                This will publish the post to your collection. This action can
                have direct effect on your collection. Please choose carefully.
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
            <>{isPublished ? "Archive Collection" : "Publish Collection"}</>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
