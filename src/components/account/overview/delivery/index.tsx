"use client";
import { Button } from "@/components/ui/button";
import { useAccountStore } from "@/store/user/account.store";
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
  const { isFetching, isLoading, data } = useAccountStore();

  if (isFetching || isLoading || !data)
    return (
      <div className="border p-4 rounded-2xl w-full relative  pointer-events-none animate-pulse duration-300">
        <div className="flex items-center gap-6 text-[0.65rem] font-medium">
          <p className="text-muted-foreground  uppercase">OtterPass</p>
        </div>

        <div>
          <h2 className="text-[1.25rem] font-bold">Free Delivery Active</h2>
          <p className="text-[0.875rem] text-muted-foreground">
            Unlimited free delivery on your orders for the month.
          </p>
        </div>

        <Button disabled variant={"outline"} className="rounded-md mt-4">
          View Pass Benefits
          <ArrowRight></ArrowRight>
        </Button>

        <Truck size={25} className="absolute top-4 right-4"></Truck>
      </div>
    );
  return (
    <div className="border p-4 rounded-2xl w-full relative">
      <div className="flex items-center gap-6 text-[0.65rem] font-medium">
        <p className="text-muted-foreground  uppercase">OtterPass</p>
        <div className="flex gap-0.75 items-center">
          {data.otter_pass ? (
            <>
              <Sparkles size={10}></Sparkles>
              <span>Active</span>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div>
        {data.otter_pass ? (
          <>
            <h2 className="text-[1.25rem] font-bold">Free Delivery Active</h2>
            <p className="text-[0.875rem] text-muted-foreground">
              Unlimited free delivery on your orders for the month.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-[1.25rem] font-bold">Activate Free Delivery</h2>
            <p className="text-[0.875rem] text-muted-foreground">
              Enjoy unlimited free delivery for the month.
            </p>
          </>
        )}
      </div>

      <Button variant={"outline"} className="rounded-md mt-4">
        View Pass Benefits
        <ArrowRight></ArrowRight>
      </Button>

      <Truck size={25} className="absolute top-4 right-4"></Truck>
    </div>
  );
}
