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
import { useDeleteCategory } from "@/hooks/admin/category.hook";
import { Loader2, Trash2 } from "lucide-react";
import { Category } from "@/types/category";

export function DeleteCategory({ category }: { category: Category }) {
  const [open, setOpen] = React.useState(false);
  const { publicId } = category;
  const { mutateAsync, isPending } = useDeleteCategory();
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
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            This will permanently remove the category from your app. These
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
            "Delete Category"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
