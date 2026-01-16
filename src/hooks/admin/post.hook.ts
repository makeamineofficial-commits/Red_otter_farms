"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPost } from "@/actions/admin/posts/create.action";
import {
  updatePost,
  UpdatePostProps,
} from "@/actions/admin/posts/update.action";
import { archivePost } from "@/actions/admin/posts/archive.action";
import { deletePost } from "@/actions/admin/posts/delete.action";

import { PostProps } from "@/types/post";
import { toast } from "sonner";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: PostProps) => {
      return await createPost(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create new post");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(res.message ?? "Post created successfully");
    },
  });

  return { ...mutation };
}
export function useUpdatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdatePostProps) => {
      return await updatePost(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to update post");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({
        queryKey: ["post", res.post?.slug],
      });
      toast.success(res.message ?? "Post updated successfully");
    },
  });

  return { ...mutation };
}

export function useArchivePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { publicId: string }) => {
      return await archivePost(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to change post status");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", res.post?.slug] });
      toast.success(res.message ?? "Post status changes successfully");
    },
  });

  return { ...mutation };
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { publicId: string }) => {
      return await deletePost(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to delete post");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", res.post?.slug] });
      toast.success(res.message ?? "Post deleted successfully");
    },
  });

  return { ...mutation };
}
