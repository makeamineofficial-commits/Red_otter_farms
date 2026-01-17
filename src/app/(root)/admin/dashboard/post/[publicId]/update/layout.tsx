import React, { ReactNode } from "react";
import { PostDetailsStore } from "@/store/admin/postDetail.store";
export default function layout({ children }: { children: ReactNode }) {
  return <PostDetailsStore>{children}</PostDetailsStore>;
}
