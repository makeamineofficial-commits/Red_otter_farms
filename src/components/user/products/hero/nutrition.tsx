import React from "react";
import { Badge } from "@/components/ui/badge";
export default function Nutrition() {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Badge
        variant={"outline"}
        className="text-[1.125rem] rounded-md! border-black/50!"
      >
        <span className="text-muted-foreground">Calories</span>{" "}
        <span className="font-medium">270 kcal</span>
      </Badge>
      <Badge
        variant={"outline"}
        className="text-[1.125rem] rounded-md! border-black/50!"
      >
        <span className="text-muted-foreground">Fat</span>{" "}
        <span className="font-medium">22 g</span>
      </Badge>
      <Badge
        variant={"outline"}
        className="text-[1.125rem] rounded-md! border-black/50!"
      >
        <span className="text-muted-foreground">Fiber</span>{" "}
        <span className="font-medium">10 g</span>
      </Badge>
      <Badge
        variant={"outline"}
        className="text-[1.125rem] rounded-md! border-black/50!"
      >
        <span className="text-muted-foreground">Potassium</span>{" "}
        <span className="font-medium">700 mg</span>
      </Badge>
    </div>
  );
}
