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
import { Loader2, Trash2 } from "lucide-react";
import { useDeleteRecipe } from "@/hooks/admin/recipe.hook";
import { Recipe } from "@/types/recipe";

export function DeleteRecipe({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = React.useState(false);
  const { publicId } = recipe;
  const { mutateAsync, isPending } = useDeleteRecipe();
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
          <DialogTitle>Delete Recipe</DialogTitle>
          <DialogDescription>
            This will permanently remove the recipe from your app. These actions
            are irreversible. Please choose carefully.
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
            "Delete Recipe"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
