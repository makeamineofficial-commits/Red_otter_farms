import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, PiggyBank, Zap } from "lucide-react";
import React from "react";

export default function KPI() {
  return (
    <div className="grid gap-4 grid-cols-2 xl:grid-cols-4 ">
      {/*  */}
      <div className="border p-4 rounded-2xl flex items-center justify-center gap-4 flex-col">
        <div className="bg-maroon/10 text-maroon flex items-center h-10 w-10 rounded-full justify-center">
          <Crown></Crown>
        </div>

        <div className="flex items-center justify-center gap-1 flex-col">
          <p className="text-xs text-muted-foreground">OtterN Premium</p>

          <Badge className="rounded-full  bg-maroon text-white">Active</Badge>
        </div>
      </div>
      {/*  */}

      <div className="border p-4 rounded-2x flex items-center justify-center gap-4 flex-col">
        <div className="">
          <Crown></Crown>
        </div>

        <div className="flex items-center justify-center gap-1 flex-col">
          <p className="text-xs text-muted-foreground">Loyalty Badge</p>

          <Badge variant={"outline"} className="rounded-full">
            Privy
          </Badge>
        </div>
      </div>
      {/*  */}
      <div className="border p-4 rounded-2xl flex items-center justify-center gap-4 flex-col">
        <div className="">
          <PiggyBank></PiggyBank>
        </div>

        <div className="flex items-center justify-center gap-1 flex-col">
          <p className="text-xs text-muted-foreground">Total Saved</p>

          <h2 className="font-bold text-[1.05rem]">$526</h2>
        </div>
        {/*  */}
      </div>
      <div className="border p-4 rounded-2xl flex items-center justify-center gap-4 flex-col">
        <div className="bg-maroon/10 text-maroon flex items-center h-10 w-10 rounded-full justify-center">
          <Zap></Zap>
        </div>

        <div className="flex items-center justify-center gap-1 flex-col">
          <p className="text-xs text-muted-foreground">Quick Shop</p>

          <h2 className="font-medium text-maroon text-[0.875rem]">
            Reorder Fast →
          </h2>
        </div>
      </div>
    </div>
  );
}
