import { z } from "zod";

export const optionSchema = z.object({
  option: z.string().min(1, "Option is required"),
  optionValue: z.string().min(1, "Option value is required"),
});

export const variantSchema = z.object({
  name: z.string().min(3).max(120),
  sku: z.string().min(5).max(120),

  availableInStock: z.coerce.number().min(0),
  stockLimit: z.coerce.number().min(0),
  inStock: z.boolean(),

  mrp: z.coerce.number().min(0),
  price: z.coerce.number().min(0),

  weight: z.coerce.number().min(0),
  weightUnit: z.string(),

  height: z.coerce.number().min(0),
  heightUnit: z.string(),
  length: z.coerce.number().min(0),
  lengthUnit: z.string(),
  breadth: z.coerce.number().min(0),
  breadthUnit: z.string(),

  isDefault: z.boolean(),
  isPublished: z.boolean(),

  options: z.array(optionSchema),
});
