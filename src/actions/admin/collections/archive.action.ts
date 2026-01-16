"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface ArchiveCollectionProps {
  publicId: string;
}
export const archiveCollection = async (collection: ArchiveCollectionProps) => {
  await validateAdmin();
  const { publicId } = collection;
  try {
    const check = await db.collection.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Collection details not found",
      };
    const updatedCollection = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const updatedCollection = await tx.collection.update({
          data: { isPublished: !check.isPublished },
          where: { id: check.id },
        });

        return updatedCollection;
      }
    );

    return {
      success: true,
      message: check.isPublished
        ? "Collection archived"
        : "Collection published",
      Collection: updatedCollection,
    };
  } catch (err) {
    return { success: false, message: "Failed to change collection status" };
  }
};
