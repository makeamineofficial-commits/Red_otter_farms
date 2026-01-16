"use server";
import { db } from "@/lib/db";
export const getAllCollection = async (): Promise<
  { publicId: string; name: string }[]
> => {
  return db.collection.findMany({
    where: { isDeleted: false, isPublished: true },
    select: {
      publicId: true,
      name: true,
    },
  });
};
