"use server";
import { validateAdmin } from "@/actions/auth/admin.action";
import { db } from "@/lib/db";
export const getAllVariants = async (): Promise<
  { publicId: string; name: string; options: string[] }[]
> => {
  try {
    await validateAdmin();
    const variants = await db.variant.findMany({
      select: {
        publicId: true,
        name: true,
        options: {
          include: {
            value: {
              select: {
                displayName: true,
              },
            },
          },
        },
      },
    });

    return variants.map((ele) => {
      return {
        ...ele,
        options: ele.options.map((ele) => ele.value.displayName),
      };
    });
  } catch (err) {
    return [];
  }
};
