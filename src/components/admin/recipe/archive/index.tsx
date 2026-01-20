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
import { useArchiveRecipe } from "@/hooks/admin/recipe.hook";
import { Archive, Loader2, ArchiveRestore } from "lucide-react";
import { Recipe } from "@/types/recipe";

export function ArchiveRecipe({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = React.useState(false);
  const { publicId, isPublished } = recipe;
  const { mutateAsync, isPending } = useArchiveRecipe();
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
            {isPublished ? "Archive Recipe" : "Publish Recipe"}
          </DialogTitle>
          <DialogDescription>
            {isPublished ? (
              <>
                This will archive the recipe from your app. This action can have
                direct effect on your app. Please choose carefully.
              </>
            ) : (
              <>
                This will publish the recipe to your app. This action can have
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
            <>{isPublished ? "Archive Recipe" : "Publish Recipe"}</>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
