"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface DeleteCollectionProps {
  publicId: string;
}
export const deleteCollection = async (collection: DeleteCollectionProps) => {
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
    const deletedcollection = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const deletedcollection = await tx.collection.update({
          data: { isDeleted: true },
          where: { id: check.id },
        });

        return deletedcollection;
      }
    );

    return {
      success: true,
      message: "Collection deleted",
      collection: deletedcollection,
    };
  } catch (err) {
    return { success: false, message: "Failed to delete collection" };
  }
};
