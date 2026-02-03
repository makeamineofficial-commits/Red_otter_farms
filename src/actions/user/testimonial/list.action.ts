"use server";
import { validateAdmin } from "@/actions/auth/admin.action";
import { db } from "@/lib/db";
import { Testimonial } from "@/types/testimonial";

export const listTestimonials = async (): Promise<{
  success: boolean;
  message: string;
  testimonials: Testimonial[];
}> => {
  try {
    const testimonials = await db.testimonial.findMany({
      where: {
        isPublished: true,
      },
      include: {
        heroImage: true,
        avatar: true,
      },
    });
    return {
      testimonials,
      success: true,
      message: "Listing testimonials successfully",
    };
  } catch (err) {}
  return {
    testimonials: [],
    success: false,
    message: "Error listing testimonials",
  };
};
