"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useParams } from "next/navigation";
export default function CreateVariant() {
  const { publicId } = useParams();
  return (
    <Link href={`/admin/dashboard/product/${publicId}/variant/create`}>
      <Button>Create Variant</Button>;
    </Link>
  );
}
