"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface ArchiveTestimonialProps {
  publicId: string;
}
export const archiveTestimonial = async (testimonial: ArchiveTestimonialProps) => {
  await validateAdmin();
  const { publicId } = testimonial;
  try {
    const check = await db.testimonial.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Testimonial details not found",
      };
    const updatedTestimonial = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const updatedTestimonial = await tx.testimonial.update({
          data: { isPublished: !check.isPublished },
          where: { id: check.id },
        });

        return updatedTestimonial;
      },
    );

    return {
      success: true,
      message: check.isPublished
        ? "Testimonial archived"
        : "Testimonial published",
      testimonial: updatedTestimonial,
    };
  } catch (err) {
    return { success: false, message: "Failed to change testimonial status" };
  }
};
