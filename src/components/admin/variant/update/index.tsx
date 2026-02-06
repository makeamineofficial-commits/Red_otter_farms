"use client";

import { Variant } from "@/types/product";
import UpdateVariantForm from "./form";

export function UpdateProduct({ variant }: { variant: Variant }) {
  return <UpdateVariantForm variant={variant} />;
}
