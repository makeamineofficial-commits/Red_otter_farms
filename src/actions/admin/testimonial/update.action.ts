"use server";
import { validateAdmin } from "@/actions/auth/admin.action";
import { db } from "@/lib/db";
import { TestimonialProps } from "@/types/testimonial";
export const updateTestimonial = async ({
  publicId,
  ...data
}: TestimonialProps & { publicId: string; slug: string }) => {
  await validateAdmin();
  try {
    const { heroImage, avatar, ...rest } = data;

    const testimonial = await db.$transaction(async (tx) => {
      const testimonial = await tx.testimonial.update({
        where: {
          publicId,
        },
        data: {
          ...rest,
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

      await tx.testimonialAsset.createMany({
        data: heroImage.map((ele) => {
          return { testimonialId: testimonial.id, ...ele };
        }),
      });
      await tx.testimonialUserAsset.createMany({
        data: avatar.map((ele) => {
          return { testimonialId: testimonial.id, ...ele };
        }),
      });
      return testimonial;
    });

    return {
      success: true,
      message: "Testimonial updated successfully",
      testimonial,
    };
  } catch (err) {
    return { success: false, message: "Failed to update testimonial" };
  }
};
