"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Category } from "@/types/category";
import UpdateCategoryForm from "./form";
import { Pencil } from "lucide-react";

export function UpdateCategory({ category }: { category: Category }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil size={15} />
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:min-w-150">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>
        <UpdateCategoryForm category={category} />
      </DialogContent>
    </Dialog>
  );
}
