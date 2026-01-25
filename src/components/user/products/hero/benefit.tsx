import React from "react";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";
import { Product } from "@/types/product";
export default function Benefit({ healthBenefits }: Product) {
  return (
    <div className="flex gap-2 items-center mt-7 flex-wrap">
      {healthBenefits.map((ele) => (
        <Badge
          variant={"outline"}
          className="text-[0.75rem] bg-muted px-3! border-black/50!"
        >
          <Leaf></Leaf>
          {ele}
        </Badge>
      ))}
    </div>
  );
}
