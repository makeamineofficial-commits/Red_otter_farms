"use server";
import { db } from "@/lib/db";
import { Variant } from "@/types/product";
import { nullToUndefined } from "@/lib/utils";
import { validateAdmin } from "@/actions/auth/admin.action";

export const getVariant = async ({
  publicId,
}: {
  publicId: string;
}): Promise<{ variant?: Variant; success: boolean; message: string }> => {
  await validateAdmin();
  const variant = await db.variant.findUnique({
    where: {
      publicId,
    },
    include: {
      options: {
        select: {
          value: {
            include: {
              option: {
                select: {
                  slug: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (!variant) return { success: true, message: "Variant details found" };
  const data: Variant = nullToUndefined({
    ...variant,
    options: variant.options.map((ele) => {
      return {
        option: ele.value.option.slug,
        optionValue: ele.value.slug,
      };
    }),
  });

  return {
    variant: data,
    success: true,
    message: "Product details found",
  };
};
