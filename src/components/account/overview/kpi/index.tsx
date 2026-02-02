"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAccountStore } from "@/store/user/account.store";
import { Crown, PiggyBank, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function KPI() {
  const { isFetching, isLoading, data } = useAccountStore();

  if (isFetching || isLoading || !data) {
    return (
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4 pointer-events-none animate-pulse duration-300">
        {/*  */}
        <div className="border p-4 rounded-2xl flex items-center justify-center gap-4 flex-col">
          <div className="bg-maroon/10 text-maroon flex items-center h-10 w-10 rounded-full justify-center">
            <Crown></Crown>
          </div>

          <div className="flex items-center justify-center gap-1 flex-col">
            <p className="text-xs text-muted-foreground">OtterN Premium</p>

            <Badge variant={"outline"} className="rounded-full">
              Loading
            </Badge>
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
              Loading
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

            <h2 className="font-bold text-[1.05rem]">₹0.00</h2>
          </div>
          {/*  */}
        </div>
        <div className="border p-4 rounded-2xl flex items-center justify-center gap-4 flex-col">
          <div className="bg-maroon/10 text-maroon flex items-center h-10 w-10 rounded-full justify-center">
            <Zap></Zap>
          </div>

          <div className="flex items-center justify-center gap-1 flex-col">
            <p className="text-xs text-muted-foreground">Quick Shop</p>

            <h2 className="font-medium text-muted-foreground text-[0.875rem]">
              Reorder Fast →
            </h2>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="grid gap-4 grid-cols-2 xl:grid-cols-4 ">
      <div className="border p-4 rounded-2xl flex items-center justify-center gap-4 flex-col">
        <div className="bg-maroon/10 text-maroon flex items-center h-10 w-10 rounded-full justify-center">
          <Crown></Crown>
        </div>

        <div className="flex items-center justify-center gap-1 flex-col">
          <p className="text-xs text-muted-foreground">OtterN Premium</p>
          {data.otter_n ? (
            <Badge className="rounded-full  bg-maroon text-white">Active</Badge>
          ) : (
            <Badge variant={"outline"} className="rounded-full ">
              Not Active
            </Badge>
          )}
        </div>
      </div>
      {/*  */}

      <div className="border p-4 rounded-2x flex items-center justify-center gap-4 flex-col">
        <div className="">
          <Crown></Crown>
        </div>

        <div className="flex items-center justify-center gap-1 flex-col">
          <p className="text-xs text-muted-foreground">Loyalty Badge</p>
          <Badge variant={"outline"} className="rounded-full capitalize">
            {data.loyality_status ? data.loyality_status : "None"}
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

          <h2 className="font-bold text-[1.05rem]">
            ₹{Number(data.total_saving ?? "0").toFixed(2) ?? "0.00"}
          </h2>
        </div>
        {/*  */}
      </div>
      <div className="border p-4 rounded-2xl flex items-center justify-center gap-4 flex-col">
        <div className="bg-maroon/10 text-maroon flex items-center h-10 w-10 rounded-full justify-center">
          <Zap></Zap>
        </div>

        <div className="flex items-center justify-center gap-1 flex-col">
          <p className="text-xs text-muted-foreground">Quick Shop</p>
          <Link href="/quick-shop">
            <h2 className="font-medium text-maroon text-[0.875rem]">
              Reorder Fast →
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
