import React, { ReactNode } from "react";
import { TestimonialStore } from "@/store/admin/testimonial.store";
export default function layout({ children }: { children: ReactNode }) {
  return <TestimonialStore>{children}</TestimonialStore>;
}
