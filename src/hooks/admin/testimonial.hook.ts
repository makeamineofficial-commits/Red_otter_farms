"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addTestimonial } from "@/actions/admin/testimonial/add.action";
import { updateTestimonial } from "@/actions/admin/testimonial/update.action";
import { archiveTestimonial } from "@/actions/admin/testimonial/archive.action";
import { deleteTestimonial } from "@/actions/admin/testimonial/delete.action";

import { Testimonial, TestimonialProps } from "@/types/testimonial";
import { toast } from "sonner";

export function useCreateTestimonial() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: TestimonialProps) => {
      return await addTestimonial(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create new testimonial");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success(res.message ?? "Testimonial created successfully");
    },
  });

  return { ...mutation };
}
export function useUpdateTestimonial() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      data: TestimonialProps & { publicId: string; slug: string },
    ) => {
      return await updateTestimonial(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to update testimonial");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({
        queryKey: ["testimonial", res.testimonial?.publicId],
      });
      toast.success(res.message ?? "Testimonial updated successfully");
    },
  });

  return { ...mutation };
}

export function useArchiveTestimonial() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { publicId: string }) => {
      return await archiveTestimonial(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to change testimonial status");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });

      toast.success(res.message ?? "Testimonial status changes successfully");
    },
  });

  return { ...mutation };
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { publicId: string }) => {
      return await deleteTestimonial(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to delete testimonial");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({
        queryKey: ["testimonial", res.testimonial?.publicId],
      });
      toast.success(res.message ?? "Testimonial deleted successfully");
    },
  });

  return { ...mutation };
}
