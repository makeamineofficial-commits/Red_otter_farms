"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCategory } from "@/actions/admin/category/create.action";
import {
  updateCategory,
  UpdateCategoryProps,
} from "@/actions/admin/category/update.action";
import { archiveCategory } from "@/actions/admin/category/archive.action";
import { deleteCategory } from "@/actions/admin/category/delete.action";

import { Category, CategoryProps } from "@/types/category";
import { toast } from "sonner";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CategoryProps) => {
      return await createCategory(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create new category");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
      toast.success(res.message ?? "Category created successfully");
    },
  });

  return { ...mutation };
}
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateCategoryProps) => {
      return await updateCategory(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to update category");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
      queryClient.invalidateQueries({
        queryKey: ["category", res.category?.publicId],
      });
      toast.success(res.message ?? "Category updated successfully");
    },
  });

  return { ...mutation };
}

export function useArchiveCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { publicId: string }) => {
      return await archiveCategory(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to change category status");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
      queryClient.invalidateQueries({
        queryKey: ["category", res.Category?.publicId],
      });
      toast.success(res.message ?? "Category status changes successfully");
    },
  });

  return { ...mutation };
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { publicId: string }) => {
      return await deleteCategory(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to delete category");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
      queryClient.invalidateQueries({
        queryKey: ["category", res.category?.publicId],
      });
      toast.success(res.message ?? "Category deleted successfully");
    },
  });

  return { ...mutation };
}
