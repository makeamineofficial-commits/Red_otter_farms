import { AssetType } from "@/types/common";
import { z } from "zod";

export const productSchema = z.object({
  // ===== BASIC INFO =====
  name: z.string().min(3).max(120),
  displayName: z.string().min(3).max(120),
  sku: z.string().min(3),
  type: z.string(),

  description: z.string().optional(),

  categories: z.array(z.string()),
  healthBenefits: z.array(z.string()),
  quantity: z.coerce.number().min(0),
  // ===== PRICING =====
  mrp: z.coerce.number().min(0),
  price: z.coerce.number().min(0),

  // ===== WEIGHT =====
  weight: z.coerce.number().min(0),
  weightUnit: z.string(),

  // ===== DIMENSIONS =====
  height: z.coerce.number().min(0),
  width: z.coerce.number().min(0),
  breadth: z.coerce.number().min(0),
  dimension: z.string(),

  // ===== SERVING INFO =====
  servingSize: z.coerce.number().min(0),
  servingUnit: z.string(),

  // ===== NUTRITION =====
  nutritionalInfo: z.json(),
  // ===== ASSETS =====
  assets: z.array(
    z.object({
      // url: z.string().url(),
      // thumbnail: z.string().url(),
      url: z.string(),
      thumbnail: z.string(),
      position: z.number().int().nonnegative(),
      isPrimary: z.boolean(),
      type: z.nativeEnum(AssetType),
    }),
  ),

  // ===== FLAGS =====
  inStock: z.boolean(),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
});

export const updateProductSchema = z.object({
  // ===== BASIC INFO =====
  name: z.string().min(3).max(120),
  displayName: z.string().min(3).max(120),
  sku: z.string().min(3),
  slug: z.string().min(3),
  type: z.string(),

  description: z.string().optional(),

  categories: z.array(z.string()),
  healthBenefits: z.array(z.string()),
  quantity: z.coerce.number().min(0),
  // ===== PRICING =====
  mrp: z.coerce.number().min(0),
  price: z.coerce.number().min(0),

  // ===== WEIGHT =====
  weight: z.coerce.number().min(0),
  weightUnit: z.string(),

  // ===== DIMENSIONS =====
  height: z.coerce.number().min(0),
  width: z.coerce.number().min(0),
  breadth: z.coerce.number().min(0),
  dimension: z.string(),

  // ===== SERVING INFO =====
  servingSize: z.coerce.number().min(0),
  servingUnit: z.string(),

  // ===== NUTRITION =====
  nutritionalInfo: z.unknown().optional(),

  // ===== ASSETS =====
  assets: z.array(
    z.object({
      // url: z.string().url(),
      // thumbnail: z.string().url(),
      url: z.string(),
      thumbnail: z.string(),
      position: z.number().int().nonnegative(),
      isPrimary: z.boolean(),
      type: z.nativeEnum(AssetType),
    }),
  ),

  // ===== FLAGS =====
  inStock: z.boolean(),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
});

export const NUTRITION_FIELDS = [
  { key: "calories", unit: "kcal" },
  { key: "protein", unit: "gm" },
  { key: "fiber", unit: "gm" },
  { key: "fat", unit: "gm" },
  { key: "carbs", unit: "gm" },
  { key: "sugar", unit: "gm" },
  { key: "sodium", unit: "mg" },
  { key: "potassium", unit: "mg" },
] as const;
