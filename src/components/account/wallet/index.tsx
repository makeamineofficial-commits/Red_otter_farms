"use client";

import { useEffect, useRef, useState } from "react";
import { Wallet, ArrowUpRight, Coins, RefreshCw, Clock } from "lucide-react";
import { requestAddToFund } from "@/actions/purchase/wallet.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAccountStore } from "@/store/user/account.store";
import Link from "next/link";

const OtterWallet = () => {
  const {
    data: user,
    isLoading: userLoading,
    isFetching,
    refetch,
  } = useAccountStore();

  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentPending, setPaymentPending] = useState(false);

  const quickAmounts = [50, 100, 250, 500];

  const balance = user?.otter_wallet ?? 0;

  const handleTopUp = async () => {
    const value = parseFloat(amount);

    if (!value || value <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    try {
      setIsLoading(true);
      const res = await requestAddToFund(value);
      if (!res.success || !res.orderId) {
        toast.error(res.message || "Failed to initiate payment");
        return;
      }
      setOrderId(res.orderId);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefetch = async () => {
    await refetch();
    setPaymentPending(false);
  };

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const paymentSuccessRef = useRef(false);

  const openRazorpay = (orderId: string) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      currency: "INR",
      name: "Red Otter Farm",
      description: "Otter Wallet TopUp",
      order_id: orderId,

      handler: async function (response: any) {
        paymentSuccessRef.current = true;
        setOrderId(null);
        setPaymentPending(true);
      },
      theme: {
        color: "#15803d",
      },

      modal: {
        ondismiss: async function () {
          setOrderId(null);
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.open();
  };

  useEffect(() => {
    if (!orderId) return;

    openRazorpay(orderId);
  }, [orderId]);
  /* ---------------- Skeleton Loader ---------------- */
  if (userLoading || isFetching) {
    return (
      <section className="space-y-6 animate-pulse">
        {/* Balance Skeleton */}
        <div className="rounded-2xl bg-muted p-6 space-y-3">
          <div className="h-4 w-32 bg-muted-foreground/20 rounded" />
          <div className="h-10 w-48 bg-muted-foreground/20 rounded" />
        </div>

        {/* Form Skeleton */}
        <div className="rounded-2xl border bg-card p-6 space-y-4">
          <div className="h-4 w-40 bg-muted-foreground/20 rounded" />

          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-9 w-20 bg-muted-foreground/20 rounded-lg"
              />
            ))}
          </div>

          <div className="flex gap-3">
            <div className="h-12 flex-1 bg-muted-foreground/20 rounded-xl" />
            <div className="h-12 w-32 bg-muted-foreground/20 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- Main UI ---------------- */
  return (
    <section className="space-y-6">
      {/* Balance Card */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-muted">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-white/5" />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="mb-1 text-sm font-medium opacity-80">
              Available Balance
            </p>

            <div className="flex items-baseline gap-1">
              <span className="text-sm font-medium opacity-70">₹</span>
              <span className="text-4xl font-bold tracking-tight">
                {balance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          {/* Refetch Button */}
          <Button
            size="icon"
            variant="ghost"
            onClick={handleRefetch}
            title="Refresh Balance"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {/* Top Up Form */}
      <div className="rounded-2xl border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Coins className="h-4 w-4 text-primary" />

          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Top Up Wallet
          </h3>
        </div>

        {/* Quick Amounts */}
        <div className="mb-4 flex flex-wrap gap-2">
          {quickAmounts.map((qa) => (
            <button
              key={qa}
              onClick={() => setAmount(qa.toString())}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary ${
                amount === qa.toString()
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary text-foreground"
              }`}
            >
              ₹{qa}
            </button>
          ))}
        </div>

        {/* Amount Input */}
        <div className="flex gap-3 md:flex-row flex-col">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
              ₹
            </span>

            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 rounded-xl border-input bg-background pl-8 text-lg font-medium focus-visible:ring-primary"
            />
          </div>

          <Button
            onClick={handleTopUp}
            disabled={isLoading || !amount}
            className="h-12 bg-maroon hover:bg-maroon rounded-xl px-8 text-sm font-semibold shadow-lg transition-all hover:shadow-xl"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing
              </span>
            ) : (
              "Add Funds"
            )}
          </Button>
        </div>
      </div>

      {paymentPending && (
        <div className="flex items-center gap-3 rounded-xl border p-4 text-sm">
          <Clock className="h-5 w-5" />

          <div className="flex-1">
            Payment received. Please wait while we update your balance. Click
            refresh to check again.{" "}
            <span className="font-semibold text-red-600">
              Please do not make another payment until your balance is updated.
            </span>{" "}
            <strong>
              <Link
                href="https://wa.me/919354808527"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                For more assistance, contact us on WhatsApp
              </Link>
              .
            </strong>
          </div>
        </div>
      )}
    </section>
  );
};

export default OtterWallet;
