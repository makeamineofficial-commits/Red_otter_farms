"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface ArchiveVariantProps {
  publicId: string;
}
export const archiveVariant = async (variant: ArchiveVariantProps) => {
  await validateAdmin();
  const { publicId } = variant;
  try {
    const check = await db.variant.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Variant details not found",
      };
    const updatedVariant = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const updatedVariant = await tx.variant.update({
          data: { isPublished: !check.isPublished },
          where: { id: check.id },
        });

        return updatedVariant;
      },
    );

    return {
      success: true,
      message: check.isPublished ? "Variant archived" : "Variant published",
      product: updatedVariant,
    };
  } catch (err) {
    return { success: false, message: "Failed to change variant status" };
  }
};
