import React, { ReactNode } from "react";
import { PostStore } from "@/store/admin/post.store";
export default function layout({ children }: { children: ReactNode }) {
  return <PostStore>{children}</PostStore>;
}
