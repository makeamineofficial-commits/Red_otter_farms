"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Address } from "@/types/account";
import { useDeleteAddress } from "@/hooks/user/use-address";
import { Button } from "@/components/ui/button";

export default function DeleteAddress({ publicId }: Address) {
  const { mutateAsync, isPending } = useDeleteAddress();

  async function onSubmit() {
    await mutateAsync({ publicId });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Trash2 size={15} className="stroke-1 text-red-500" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold">Delete Address</h2>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this address? This action cannot
              be undone and may affect future deliveries.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button
              variant="destructive"
              onClick={onSubmit}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
