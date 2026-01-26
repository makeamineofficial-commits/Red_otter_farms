import React from "react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
export default function Nutrition({ nutritionalInfo }: Product) {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      {Object.entries(nutritionalInfo).map(([key]) => (
        <Badge
          variant={"outline"}
          className="text-[1rem] rounded-full! px-3.5! border-black/50!"
        >
          <span className="text-muted-foreground capitalize">{key}</span>{" "}
          <span className="font-medium">{nutritionalInfo[key]}</span>
        </Badge>
      ))}
    </div>
  );
}
