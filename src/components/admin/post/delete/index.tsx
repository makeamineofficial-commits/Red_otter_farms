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
import { useDeletePost } from "@/hooks/admin/post.hook";
import { Post } from "@/types/post";

export function DeletePost({ post }: { post: Post }) {
  const [open, setOpen] = React.useState(false);
  const { publicId } = post;
  const { mutateAsync, isPending } = useDeletePost();
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
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            This will permanently remove the post from your app. These actions
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
            "Delete Post"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
