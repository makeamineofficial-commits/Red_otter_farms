"use server";

import { db } from "@/lib/db";
import { validateAdmin } from "../../auth/admin.action";
import { VariantProps } from "@/types/product";

export const updateVariant = async (
  details: VariantProps & {
    productId: string;
    variantId: string;
  },
) => {
  await validateAdmin();

  const { options: _options, productId, variantId, ...rest } = details;

  /* ------------------ Get Product ------------------ */

  const product = await db.product.findFirst({
    where: {
      publicId: productId,
    },
  });

  if (!product)
    return {
      success: false,
      message: "Product details not found",
    };

  /* ------------------ Get Variant ------------------ */

  const variant = await db.variant.findFirst({
    where: {
      publicId: variantId,
    },
  });

  if (!variant)
    return {
      success: false,
      message: "Variant details not found",
    };

  try {
    const result = await db.$transaction(async (tx) => {
      /* ---------- Validate Option Values ---------- */

      const values = await tx.optionValue.findMany({
        where: {
          slug: {
            in: _options.map((ele) => ele.optionValue),
          },
        },
      });

      if (values.length !== _options.length) {
        throw new Error("Some option values are invalid");
      }

      /* ---------- Check Combination Exists ---------- */

      const valueIds = values.map((v) => v.id).sort();

      const existingVariants = await tx.variant.findMany({
        where: {
          productId: product.id,
          NOT: {
            id: variant.id, // exclude current
          },
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

      /* ---------- Handle Default Variant ---------- */

      if (details.isDefault) {
        await tx.variant.updateMany({
          where: {
            productId: product.id,
            isDefault: true,
            NOT: {
              id: variant.id,
            },
          },
          data: {
            isDefault: false,
          },
        });
      }

      /* ---------- Update Variant ---------- */

      const updatedVariant = await tx.variant.update({
        where: {
          id: variant.id,
        },
        data: {
          ...rest,
          mrp: rest.mrp * 100,
          price: rest.price * 100,
          productId: product.id,
        },
      });

      /* ---------- Reset Option Mapping ---------- */

      await tx.variantOptionMap.deleteMany({
        where: {
          variantId: updatedVariant.id,
        },
      });

      await tx.variantOptionMap.createMany({
        data: valueIds.map((valueId) => ({
          variantId: updatedVariant.id,
          valueId,
        })),
      });

      return updatedVariant;
    });

    return {
      success: true,
      message: "Variant updated successfully",
      variant: result,
    };
  } catch (err: any) {
    console.error("Update Variant Error:", err);

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
      message: err.message || "Failed to update variant",
    };
  }
};
