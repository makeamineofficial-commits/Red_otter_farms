"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginUser, verifyUser } from "@/actions/auth/user.action";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Label } from "@/components/ui/label";

const phoneSchema = z.object({
  phone: z.string().min(10, "Please enter a valid mobile number"),
  type: z.string(),
});

const otpSchema = z.object({
  otp: z.string().min(6, "Enter valid OTP"),
});

export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isPending, startTransition] = useTransition();

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "", type: "mobile" },
  });

  const onSendOTP = (values: z.infer<typeof phoneSchema>) => {
    startTransition(async () => {
      const res = await loginUser(values);

      if (!res?.success) {
        toast.error(res?.message || "Failed to send OTP");
        return;
      }

      toast.success(res.message);
      setStep("otp");
    });
  };

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onVerifyOTP = (values: z.infer<typeof otpSchema>) => {
    startTransition(async () => {
      const res = await verifyUser(values);

      if (!res?.success) {
        toast.error(res?.message || "OTP verification failed");
        return;
      }

      toast.success("Login successful");
      router.push("/account/profile");
    });
  };

  return (
    <div className="flex flex-col h-full px-6 py-4">
      {step === "phone" && (
        <Form {...phoneForm}>
          <form
            onSubmit={phoneForm.handleSubmit(onSendOTP)}
            className="space-y-6"
          >
            <FormField
              control={phoneForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium">
                    Mobile Number <span className="text-red-500">*</span>
                  </Label>

                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-full px-4 py-2">
                      <span className="text-sm text-muted-foreground border-r pr-3">
                        +91
                      </span>
                      <Input
                        {...field}
                        placeholder="Enter mobile number"
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3 pt-2">
              <Button
                type="submit"
                className="w-full bg-maroon rounded-full py-6 text-sm font-semibold hover:bg-maroon/90"
                disabled={isPending}
              >
                {isPending ? "Sending OTP..." : "LOGIN WITH OTP"}
              </Button>

              <Button
                type="button"
                className="w-full bg-maroon rounded-full py-6 text-sm font-semibold hover:bg-maroon/90"
                disabled={isPending}
                onClick={() => {
                  phoneForm.setValue("type", "whatsapp");
                  phoneForm.handleSubmit(onSendOTP)();
                }}
              >
                LOGIN WITH WHATSAPP
              </Button>
            </div>
          </form>
        </Form>
      )}

      {step === "otp" && (
        <Form {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(onVerifyOTP)}
            className="space-y-6"
          >
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit OTP sent to your phone
            </p>

            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex justify-center">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        {[...Array(3)].map((_, i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                        <InputOTPSeparator />
                        {[...Array(3)].map((_, i) => (
                          <InputOTPSlot key={i + 3} index={i + 3} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-maroon rounded-full py-6 text-sm font-semibold hover:bg-maroon/90"
              disabled={isPending}
            >
              {isPending ? "Verifying..." : "VERIFY OTP"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full py-6 text-sm font-semibold border-maroon text-maroon hover:bg-maroon hover:text-white"
              onClick={() => setStep("phone")}
            >
              Back
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
