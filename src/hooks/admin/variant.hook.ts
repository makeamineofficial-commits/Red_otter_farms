"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createVariant } from "@/actions/admin/variants/create.action";
import { updateVariant } from "@/actions/admin/variants/update.action";
import { archiveVariant } from "@/actions/admin/variants/archive.action";
import { deleteVariant } from "@/actions/admin/variants/delete.action";

import { ProductProps } from "@/types/product";
import { toast } from "sonner";

export function useCreateVariant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVariant,
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create new variant");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      toast.success(res.message ?? "Variant created successfully");
    },
  });
}
export function useUpdateVariant() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateVariant,
    onSuccess: (res) => {
      console.log(res);
      if (!res.success) {
        toast.error(res.message ?? "Failed to update variant");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      queryClient.invalidateQueries({
        queryKey: ["variant", res.variant?.publicId],
      });
      toast.success(res.message ?? "Variant updated successfully");
    },
  });

  return { ...mutation };
}

export function useArchiveVariant() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: archiveVariant,
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to change variant status");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      queryClient.invalidateQueries({
        queryKey: ["variant", res.product?.publicId],
      });
      toast.success(res.message ?? "Variant status changes successfully");
    },
  });

  return { ...mutation };
}

export function useDeleteVariant() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { publicId: string }) => {
      return await deleteVariant(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to delete variant");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      queryClient.invalidateQueries({
        queryKey: ["variant", res.variant?.publicId],
      });
      toast.success(res.message ?? "Variant deleted successfully");
    },
  });

  return { ...mutation };
}
