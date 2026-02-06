import { Prisma } from "@/lib/db";
import { generateSlug } from "@/lib/utils";

export async function syncOptions(
  tx: Prisma.TransactionClient,
  productId: string,
  incomingOptions: {
    displayName: string;
    slug: string;
    values: { displayName: string; slug: string; isDefault: boolean }[];
  }[],
) {
  /* --------------------------------
     Load Existing
  -------------------------------- */
  const existingOptions = await tx.option.findMany({
    where: { productId },
    include: {
      values: {
        include: {
          variants: true,
        },
      },
    },
  });

  const existingOptionMap = new Map(existingOptions.map((o) => [o.slug, o]));
  const incomingOptionMap = new Map(incomingOptions.map((o) => [o.slug, o]));

  /* --------------------------------
     1️⃣ Validate Value Deletions FIRST
  -------------------------------- */
  for (const oldOpt of existingOptions) {
    const incomingOpt = incomingOptionMap.get(oldOpt.slug);

    // Option removed → all its values are being removed
    if (!incomingOpt) {
      for (const val of oldOpt.values) {
        if (val.variants.length > 0) {
          throw new Error(
            `Cannot remove option "${oldOpt.displayName}" because value "${val.displayName}" is used by variants`,
          );
        }
      }
      continue;
    }

    // Option exists → check values
    const incomingValueSlugs = new Set(incomingOpt.values.map((v) => v.slug));

    for (const val of oldOpt.values) {
      if (!incomingValueSlugs.has(val.slug)) {
        if (val.variants.length > 0) {
          throw new Error(
            `Cannot remove value "${val.displayName}" from "${oldOpt.displayName}" because it is used by variants`,
          );
        }
      }
    }
  }

  /* --------------------------------
     2️⃣ Delete Unused Values
  -------------------------------- */
  for (const oldOpt of existingOptions) {
    const incomingOpt = incomingOptionMap.get(oldOpt.slug);
    if (!incomingOpt) continue;

    const incomingValueMap = new Map(
      incomingOpt.values.map((v) => [v.slug, v]),
    );

    for (const val of oldOpt.values) {
      if (!incomingValueMap.has(val.slug)) {
        await tx.optionValue.delete({
          where: { id: val.id },
        });
      }
    }
  }

  /* --------------------------------
     3️⃣ Delete Options (After Values)
  -------------------------------- */
  for (const oldOpt of existingOptions) {
    if (!incomingOptionMap.has(oldOpt.slug)) {
      await tx.option.delete({
        where: { id: oldOpt.id },
      });
    }
  }

  /* --------------------------------
     4️⃣ Upsert Options + Values
  -------------------------------- */
  for (const opt of incomingOptions) {
    const existingOpt = existingOptionMap.get(opt.slug);
    const slug = generateSlug("option", opt.displayName);
    /* ---- Create Option ---- */
    if (!existingOpt) {
      const newOpt = await tx.option.create({
        data: {
          slug: slug,
          displayName: opt.displayName,
          productId,
        },
      });

      await tx.optionValue.createMany({
        data: opt.values.map((v) => ({
          slug: generateSlug("value", v.displayName),
          displayName: v.displayName,
          optionId: newOpt.id,
        })),
      });

      continue;
    }

    /* ---- Update Option ---- */
    await tx.option.update({
      where: { id: existingOpt.id },
      data: {
        displayName: opt.displayName,
      },
    });

    const existingValueMap = new Map(
      existingOpt.values.map((v) => [v.slug, v]),
    );

    /* ---- Upsert Values ---- */
    for (const val of opt.values) {
      const oldVal = existingValueMap.get(val.slug);
      const slug = generateSlug("value", val.displayName);
      if (!oldVal) {
        await tx.optionValue.create({
          data: {
            slug: slug,
            displayName: val.displayName,
            isDefault: val.isDefault,
            optionId: existingOpt.id,
          },
        });
      } else {
        await tx.optionValue.update({
          where: { id: oldVal.id },
          data: {
            isDefault: val.isDefault,
            displayName: val.displayName,
          },
        });
      }
    }
  }
}
