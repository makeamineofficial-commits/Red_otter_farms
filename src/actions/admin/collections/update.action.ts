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
  const { publicId, slug } = collection;
  try {
    const check = await db.collection.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Collection with this publicId doesn't exist",
      };

    const exist = await db.collection.findFirst({
      where: {
        OR: [{ slug }],
      },
    });

    if (exist && exist.id !== check.id)
      return {
        success: false,
        message: "Collection with this slug already exist",
      };
    const updatedCollection = await db.$transaction(
      async (tx: Prisma.TransactionClient): Promise<Collection> => {
        const { publicId, ...rest } = collection;
        const updatedCollection = await tx.collection.update({
          data: { ...rest },
          where: { publicId: check.publicId },
        });
        return {
          ...updatedCollection,
          description: updatedCollection.description ?? undefined,
        };
      },
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
