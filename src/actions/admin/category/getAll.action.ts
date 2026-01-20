"use server";
import { validateAdmin } from "@/actions/auth/admin.action";
import { db } from "@/lib/db";
export const getAllCategory = async (): Promise<
  { publicId: string; name: string }[]
> => {
  try {
    await validateAdmin();
    return db.category.findMany({
      where: { isDeleted: false, isPublished: true },
      select: {
        publicId: true,
        name: true,
      },
    });
  } catch (err) {
    return [];
  }
};
