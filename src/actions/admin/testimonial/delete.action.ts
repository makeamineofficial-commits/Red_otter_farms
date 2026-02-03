"use server";
import { validateAdmin } from "@/actions/auth/admin.action";
import { db } from "@/lib/db";

export const deleteTestimonial = async (data: { publicId: string }) => {
  await validateAdmin();
  try {
    const testimonial = await db.$transaction(async (tx) => {
      const testimonial = await tx.testimonial.delete({
        where: {
          publicId: data.publicId,
        },
      });

      await tx.testimonialAsset.deleteMany({
        where: {
          testimonialId: testimonial.id,
        },
      });
      await tx.testimonialUserAsset.deleteMany({
        where: {
          testimonialId: testimonial.id,
        },
      });

      return testimonial;
    });

    return {
      success: true,
      message: "Testimonial deleted successfully",
      testimonial,
    };
  } catch (err) {
    return { success: false, message: "Failed to delete testimonial" };
  }
};
