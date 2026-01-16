"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduct } from "@/actions/admin/products/create.action";
import {
  updateProduct,
  UpdateProductProps,
} from "@/actions/admin/products/update.action";
import { archiveProduct } from "@/actions/admin/products/archive.action";
import { deleteProduct } from "@/actions/admin/products/delete.action";

import { ProductProps } from "@/types/product";
import { toast } from "sonner";

export function useCreateproduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ProductProps) => {
      return await createProduct(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create new product");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(res.message ?? "product created successfully");
    },
  });

  return { ...mutation };
}
export function useUpdateproduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateProductProps) => {
      return await updateProduct(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to update product");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", res.product?.slug],
      });
      toast.success(res.message ?? "product updated successfully");
    },
  });

  return { ...mutation };
}

export function useArchiveproduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { slug: string }) => {
      return await archiveProduct(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to change product status");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", res.product?.slug],
      });
      toast.success(res.message ?? "product status changes successfully");
    },
  });

  return { ...mutation };
}

export function useDeleteproduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { slug: string }) => {
      return await deleteProduct(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to delete product");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", res.product?.slug],
      });
      toast.success(res.message ?? "product deleted successfully");
    },
  });

  return { ...mutation };
}
