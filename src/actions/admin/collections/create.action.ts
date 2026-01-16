"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { CollectionProps } from "@/types/collection";
import { generateSlug } from "@/lib/utils";
export const createCollection = async (collection: CollectionProps) => {
  await validateAdmin();

  try {
    const slug = generateSlug("collection", collection.name);

    const check = await db.collection.findFirst({
      where: {
        OR: [{ slug }],
      },
    });

    if (check)
      return {
        success: false,
        message: "Collection with this slug already exist",
      };
    const newCollection = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const { ...rest } = collection;
        const newCollection = await tx.collection.create({
          data: { slug, ...rest },
        });

        return newCollection;
      }
    );

    return {
      success: true,
      message: "New collection added to store",
      Collection: newCollection,
    };
  } catch (err) {
    return { success: false, message: "Failed to create new collection" };
  }
};
