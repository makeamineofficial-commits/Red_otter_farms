"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { Collection, CollectionProps } from "@/types/collection";

export interface UpdateCollectionProps extends CollectionProps {
  publicId: string;
  slug: string;
}

export const updateCollection = async (collection: UpdateCollectionProps) => {
  await validateAdmin();
  const { slug, publicId } = collection;
  try {
    const check = await db.collection.findFirst({
      where: {
        AND: [{ slug }, { publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Collection with this slug doesn't exist",
      };
    const updatedCollection = await db.$transaction(
      async (tx: Prisma.TransactionClient): Promise<Collection> => {
        const { slug, publicId, ...rest } = collection;
        const newCollection = await tx.collection.update({
          data: { ...rest },
          where: { publicId: check.publicId },
        });
        return updatedCollection;
      }
    );

    return {
      success: true,
      message: "Collection updated",
      collection: updatedCollection,
    };
  } catch (err) {
    return { success: false, message: "Failed to update collection" };
  }
};
