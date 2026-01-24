import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Sparkle,
  Sparkles,
  Truck,
  Wallet,
  Zap,
} from "lucide-react";
import React from "react";

export default function Delivery() {
  return (
    <div className="border p-4 rounded-2xl w-full relative">
      <div className="flex items-center gap-6 text-[0.65rem] font-medium">
        <p className="text-muted-foreground  uppercase">OtterPass</p>
        <div className="flex gap-0.75 items-center">
          <Sparkles size={10}></Sparkles>
          <span>Active</span>
        </div>
      </div>

      <div>
        <h2 className="text-[1.25rem] font-bold">Free Delivery Active</h2>
        <p className="text-[0.875rem] text-muted-foreground">
          Unlimited free delivery on your orders for the month.
        </p>
      </div>

      <Button variant={"outline"} className="rounded-md mt-4">
        View Pass Benefits
        <ArrowRight></ArrowRight>
      </Button>

      <Truck size={25} className="absolute top-4 right-4"></Truck>
    </div>
  );
}
