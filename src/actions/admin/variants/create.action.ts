"use server";

import { db } from "@/lib/db";
import { validateAdmin } from "../../auth/admin.action";
import { VariantProps } from "@/types/product";

export const createVariant = async (
  variant: VariantProps & { productId: string },
) => {
  await validateAdmin();

  const {
    options: _options,

    ...rest
  } = variant;
  const product = await db.product.findFirst({
    where: {
      AND: [{ publicId: variant.productId }],
    },
  });

  if (!product)
    return {
      success: false,
      message: "Product details not found",
    };

  try {
    const result = await db.$transaction(async (tx) => {
      const values = await tx.optionValue.findMany({
        where: {
          slug: {
            in: variant.options.map((ele) => ele.optionValue),
          },
        },
      });

      if (values.length !== variant.options.length) {
        throw new Error("Some option values are invalid");
      }

      const valueIds = values.map((v) => v.id).sort();
      const existingVariants = await tx.variant.findMany({
        where: {
          productId: product.id,
        },
        include: {
          options: true, // VariantOptionMap
        },
      });

      for (const v of existingVariants) {
        const existingValueIds = v.options.map((o) => o.valueId).sort();

        if (
          existingValueIds.length === valueIds.length &&
          existingValueIds.every((id, i) => id === valueIds[i])
        ) {
          throw new Error("This variant combination already exists");
        }
      }
      if (variant.isDefault) {
        await tx.variant.updateMany({
          where: {
            productId: product.id,
            isDefault: true,
          },
          data: {
            isDefault: false,
          },
        });
      }
      const newVariant = await tx.variant.create({
        data: {
          ...rest,
          productId: product.id,
        },
      });
      await tx.variantOptionMap.createMany({
        data: valueIds.map((valueId) => ({
          variantId: newVariant.id,
          valueId,
        })),
      });

      return newVariant;
    });

    return {
      success: true,
      message: "New variant added to store",
      product: result,
    };
  } catch (err: any) {
    console.error("Create Variant Error:", err);

    if (err.code === "P2011") {
      console.error("NULL field:", err.meta);
    }

    if (err.code === "P2002") {
      return {
        success: false,
        message: "SKU already exists",
      };
    }

    if (err.message?.includes("combination")) {
      return {
        success: false,
        message: "This variant combination already exists",
      };
    }

    return {
      success: false,
      message: err.message || "Failed to create new variant",
    };
  }
};
