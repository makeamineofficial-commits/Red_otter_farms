"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateProduct() {
  return (
    <Link href="/admin/dashboard/product/create">
      <Button>Create Product</Button>
    </Link>
  );
}
