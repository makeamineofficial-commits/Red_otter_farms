"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const indianMobileRegex = /^[6-9]\d{9}$/;

const formSchema = z.object({
  email: z.string().email({ message: "Please add a valid email" }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || indianMobileRegex.test(val), {
      message: "Please enter a valid phone number",
    }),
});

export default function NewsletterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
            name="phone"
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
            type="submit"
            className="bg-white! uppercase hover:text-red-500 font-bold h-18 px-12  rounded-2xl!  text-[1.175rem]! tracking-[1.42px]! text-red-500"
          >
            SUBSCRIBE NOW
          </Button>
        </form>
      </Form>
    </article>
  );
}
