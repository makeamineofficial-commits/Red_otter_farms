"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { subscribeForNewsletter } from "@/actions/newsletter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const indianMobileRegex = /^[6-9]\d{9}$/;

const formSchema = z.object({
  email: z.string().email({ message: "Please add a valid email" }),
  mobile: z
    .string()
    .optional()
    .refine((val) => !val || indianMobileRegex.test(val), {
      message: "Please enter a valid mobile number",
    }),
});

export default function NewsletterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      mobile: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await subscribeForNewsletter(values);
      if (res.success) {
        toast.info(res.message);
        return;
      }
      toast.error("Failed to subscribe for newsletter");
    } catch (err) {
      toast.error("Failed to subscribe for newsletter");
    }
  }
  return (
    <article className="flex flex-col justify-between gap-2 m-auto w-full md:w-fit md:ml-auto">
      <h2 className="text-[1.125rem] align-middle  font-normal tracking-[0.6px] leading-[1.575rem] text-mint uppercase">
        Join our list for updates
      </h2>
      <p className="text-[1.125rem] align-middle font-normal tracking-[0.6px]  leading-[1.575rem] text-mint">
        No spam, just the good stuff.
      </p>
      <br className="md:block hidden" />
      <br />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 flex-col xl:flex-row 3xl:gap-10 sm:w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="text-white! aria-invalid:ring-0! w-full md:w-96  font-normal! aria-invalid:border-b-destructive! border-transparent pb-8! h-auto! text-[1.375rem]!  rounded-none! border-b-mint"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Phone number (optional)"
                    className="text-white! aria-invalid:ring-0! w-full md:w-96  font-normal! aria-invalid:border-b-destructive! border-transparent pb-8! h-auto! text-[1.375rem]!  rounded-none! border-b-mint"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isLoading || form.formState.isSubmitting}
            type="submit"
            className="bg-white! uppercase hover:text-red-500 font-bold h-18 px-12  rounded-2xl!  text-[1.175rem]! tracking-[1.42px]! text-red-500"
          >
            <>SUBSCRIBE NOW</>
          </Button>
        </form>
      </Form>
    </article>
  );
}
