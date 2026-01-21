"use server";
import { validateAdmin } from "@/actions/auth/admin.action";
import { db } from "@/lib/db";
import { Asset } from "@/types/common";
export const getAllProducts = async (): Promise<
  { publicId: string; name: string }[]
> => {
  try {
    await validateAdmin();
    return db.product.findMany({
      select: {
        publicId: true,
        name: true,
      },
    });
  } catch (err) {
    return [];
  }
};
