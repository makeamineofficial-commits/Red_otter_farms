"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCollection } from "@/actions/admin/collections/create.action";
import {
  updateCollection,
  UpdateCollectionProps,
} from "@/actions/admin/collections/update.action";
import { archiveCollection } from "@/actions/admin/collections/archive.action";
import { deleteCollection } from "@/actions/admin/collections/delete.action";

import { Collection, CollectionProps } from "@/types/collection";
import { toast } from "sonner";

export function useCreateCollection() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CollectionProps) => {
      return await createCollection(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create new collection");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success(res.message ?? "Collection created successfully");
    },
  });

  return { ...mutation };
}
export function useUpdateCollection() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateCollectionProps) => {
      return await updateCollection(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to update collection");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({
        queryKey: ["collection", res.collection?.slug],
      });
      toast.success(res.message ?? "Collection updated successfully");
    },
  });

  return { ...mutation };
}

export function useArchiveCollection() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { publicId: string }) => {
      return await archiveCollection(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to change collection status");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({
        queryKey: ["collection", res.Collection?.slug],
      });
      toast.success(res.message ?? "Collection status changes successfully");
    },
  });

  return { ...mutation };
}

export function useDeleteCollection() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { publicId: string }) => {
      return await deleteCollection(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to delete collection");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({
        queryKey: ["collection", res.collection?.slug],
      });
      toast.success(res.message ?? "Collection deleted successfully");
    },
  });

  return { ...mutation };
}
