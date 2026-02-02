"use client";
import { Button } from "@/components/ui/button";
import { useAccountStore } from "@/store/user/account.store";
import { ArrowRight, Wallet, Zap } from "lucide-react";
import React from "react";

export default function Balance() {
  const { isFetching, isLoading, data } = useAccountStore();
  if (isFetching || isLoading || !data)
    return (
      <div className="border p-4 rounded-2xl w-full relative pointer-events-none animate-pulse duration-300">
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground font-medium uppercase text-[0.65rem]">
            OtterWallet
          </p>
          <Zap size={12}></Zap>
        </div>

        <div>
          <h2 className="text-[1.25rem] font-bold">Balance: ₹00.00</h2>
          <p className="text-[0.875rem] text-muted-foreground">
            Use it on your next order to save time.
          </p>
        </div>

        <Button disabled variant={"outline"} className="rounded-md mt-4">
          <ArrowRight></ArrowRight>
          Shop with Wallet
        </Button>

        <Wallet size={20} className="absolute top-4 right-4"></Wallet>
      </div>
    );
  return (
    <div className="border p-4 rounded-2xl w-full relative">
      <div className="flex items-center gap-2">
        <p className="text-muted-foreground font-medium uppercase text-[0.65rem]">
          OtterWallet
        </p>
        <Zap size={12}></Zap>
      </div>

      <div>
        <h2 className="text-[1.25rem] font-bold">
          Balance: ₹{Number(data?.otter_wallet ?? "0").toFixed(2) ?? "0.00"}
        </h2>
        <p className="text-[0.875rem] text-muted-foreground">
          Use it on your next order to save time.
        </p>
      </div>

      <Button variant={"outline"} className="rounded-md mt-4">
        <ArrowRight></ArrowRight>
        Shop with Wallet
      </Button>

      <Wallet size={20} className="absolute top-4 right-4"></Wallet>
    </div>
  );
}
