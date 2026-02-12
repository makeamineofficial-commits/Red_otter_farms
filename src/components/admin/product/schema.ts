import { AssetType } from "@/types/common";
import { z } from "zod";

export const optionValueSchema = z.object({
  displayName: z.string().min(1),

  isDefault: z.boolean().default(false),
});

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const optionSchema = z
  .object({
    displayName: z.string().min(1, "Option name is required").max(100),

    values: z.array(optionValueSchema).min(1, "At least one value is required"),
  })
  .refine((data) => data.values.filter((v) => v.isDefault).length === 1, {
    message: "Each option must have exactly one default value",
    path: ["values"],
  });

export const productSchema = z.object({
  name: z.string().min(3).max(120),
  displayName: z.string().min(3).max(120),
  type: z.string(),
  minPrice: z.coerce.number().min(0),
  maxPrice: z.coerce.number().min(0),
  summary: z.string().optional(),
  description: z.string().optional(),

  categories: z.array(z.string()),
  healthBenefits: z.array(z.string()),

  nutritionalInfo: z.json(),
  assets: z.array(
    z.object({
      url: z.string(),
      thumbnail: z.string(),
      position: z.number().int().nonnegative(),
      isPrimary: z.boolean(),
      type: z.nativeEnum(AssetType),
    }),
  ),
  faqs: z.array(faqSchema),
  options: z.array(optionSchema).max(5, "Maximum 5 options allowed"),
  isPublished: z.boolean(),
  isDryStore: z.boolean(),
  isFeatured: z.boolean(),
});

export const updateOptionValueSchema = z.object({
  displayName: z.string().min(1),
  slug: z.string().optional(),
  isDefault: z.boolean().default(false),
});

export const updateOptionSchema = z
  .object({
    displayName: z.string().min(1, "Option name is required").max(100),
    slug: z.string().optional(),
    values: z
      .array(updateOptionValueSchema)
      .min(1, "At least one value is required"),
  })
  .refine((data) => data.values.filter((v) => v.isDefault).length === 1, {
    message: "Each option must have exactly one default value",
    path: ["values"],
  });

export const updateProductSchema = z.object({
  name: z.string().min(3).max(120),
  displayName: z.string().min(3).max(120),
  minPrice: z.coerce.number().min(0),
  maxPrice: z.coerce.number().min(0),
  type: z.string(),
  slug: z.string(),
  summary: z.string().optional(),
  description: z.string().optional(),
  faqs: z.array(faqSchema),
  categories: z.array(z.string()),
  healthBenefits: z.array(z.string()),

  nutritionalInfo: z.json(),
  assets: z.array(
    z.object({
      url: z.string(),
      thumbnail: z.string(),
      position: z.number().int().nonnegative(),
      isPrimary: z.boolean(),
      type: z.nativeEnum(AssetType),
    }),
  ),

  options: z.array(updateOptionSchema).max(5, "Maximum 5 options allowed"),
  isPublished: z.boolean(),
  isDryStore: z.boolean(),
  isFeatured: z.boolean(),
});
