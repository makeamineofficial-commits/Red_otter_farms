"use server";
import { validateAdmin } from "@/actions/auth/admin.action";
import { db } from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { TestimonialProps } from "@/types/testimonial";
export const addTestimonial = async (data: TestimonialProps) => {
  await validateAdmin();
  try {
    const slug = generateSlug("testimonial", "");
    const { heroImage, avatar, ...rest } = data;

    await db.$transaction(async (tx) => {
      const testimonial = await tx.testimonial.create({
        data: {
          slug,
          ...rest,
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
    });

    return { success: true, message: "Testimonial added successfully" };
  } catch (err) {
    return { success: false, message: "Failed to add testimonial" };
  }
};
