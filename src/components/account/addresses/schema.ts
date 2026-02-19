import { states } from "@/types/account";
import { z } from "zod";

export const addressSchema = z
  .object({
    address: z.string().min(3),
    street: z.string().min(3),
    zip: z.string().regex(/^[0-9]{6}$/),
    city: z.string().min(2),
    stateCode: z.enum([...states.map((ele) => ele.code)]),
    countryCode: z.string().min(2),
    label: z.enum(["HOME", "WORK", "CUSTOM"]),
    tag: z.enum(["SHIPPING", "BILLING", "NONE"]),
    customLabel: z.string().optional(),
    attention: z.string(),
  })
  .refine((data) => data.label !== "CUSTOM" || !!data.customLabel?.trim(), {
    path: ["customLabel"],
    message: "Please enter a custom label",
  });
