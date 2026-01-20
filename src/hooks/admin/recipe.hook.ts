"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createRecipe } from "@/actions/admin/recipe/create.action";
import {
  updateRecipe,
  UpdateRecipeProps,
} from "@/actions/admin/recipe/update.action";
import { archiveRecipe } from "@/actions/admin/recipe/archive.action";
import { deleteRecipe } from "@/actions/admin/recipe/delete.action";

import { RecipeProps } from "@/types/recipe";
import { toast } from "sonner";

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: RecipeProps) => {
      return await createRecipe(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create new recipe");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast.success(res.message ?? "Recipe created successfully");
    },
  });

  return { ...mutation };
}
export function useUpdateRecipe() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateRecipeProps) => {
      return await updateRecipe(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to update recipe");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({
        queryKey: ["recipe", res.recipe?.publicId],
      });
      toast.success(res.message ?? "Recipe updated successfully");
    },
  });

  return { ...mutation };
}

export function useArchiveRecipe() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { publicId: string }) => {
      return await archiveRecipe(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to change recipe status");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({ queryKey: ["recipe", res.recipe?.publicId] });
      toast.success(res.message ?? "Recipe status changes successfully");
    },
  });

  return { ...mutation };
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { publicId: string }) => {
      return await deleteRecipe(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to delete recipe");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({ queryKey: ["recipe", res.recipe?.publicId] });
      toast.success(res.message ?? "Recipe deleted successfully");
    },
  });

  return { ...mutation };
}
