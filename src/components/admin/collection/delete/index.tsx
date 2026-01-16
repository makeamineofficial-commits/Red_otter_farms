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
import { useDeleteCollection } from "@/hooks/admin/collection.hook";
import { Loader2, Trash2 } from "lucide-react";
import { Collection } from "@/types/collection";

export function DeleteCollection({ collection }: { collection: Collection }) {
  const [open, setOpen] = React.useState(false);
  const { slug } = collection;
  const { mutateAsync, isPending } = useDeleteCollection();
  const handleAction = async () => {
    await mutateAsync({ slug });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2 size={15} className="stroke-red-500"></Trash2>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Collection</DialogTitle>
          <DialogDescription>
            This will permanently remove the collection from your app. These
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
            "Delete Post"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
