"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateRecipe() {
  return (
    <Link href="/admin/dashboard/recipe/create">
      <Button>Create Recipe</Button>;
    </Link>
  );
}
