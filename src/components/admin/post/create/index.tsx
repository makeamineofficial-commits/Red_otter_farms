"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreatePost() {
  return (
    <Link href="/admin/dashboard/post/create">
      <Button>Create Post</Button>;
    </Link>
  );
}
