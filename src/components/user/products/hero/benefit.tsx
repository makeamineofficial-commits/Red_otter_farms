import React from "react";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";
export default function Benefit() {
  return (
    <div className="flex gap-2 items-center mt-7 flex-wrap">
      <Badge
        variant={"outline"}
        className="text-[0.75rem] bg-muted px-3! border-black/50!"
      >
        <Leaf></Leaf>
        Heart Health
      </Badge>
      <Badge
        variant={"outline"}
        className="text-[0.75rem] bg-muted px-3! border-black/50!"
      >
        <Leaf></Leaf>
        Gut Friendly
      </Badge>
      <Badge
        variant={"outline"}
        className="text-[0.75rem] bg-muted px-3! border-black/50!"
      >
        <Leaf></Leaf>
        Keto Friendly
      </Badge>
      <Badge
        variant={"outline"}
        className="text-[0.75rem] bg-muted px-3! border-black/50!"
      >
        <Leaf></Leaf>
        Keto Friendly
      </Badge>
      <Badge
        variant={"outline"}
        className="text-[0.75rem] bg-muted px-3! border-black/50!"
      >
        <Leaf></Leaf>
        Single Origin
      </Badge>
    </div>
  );
}
