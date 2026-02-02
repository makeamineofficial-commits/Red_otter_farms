"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccountStore } from "@/store/user/account.store";
import { useEffect } from "react";

const indianMobileRegex = /^[6-9]\d{9}$/;

export const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  mobile: z
    .string()
    .optional()
    .refine((val) => !val || indianMobileRegex.test(val), {
      message: "Please enter a valid phone number",
    }),

  age: z
    .number({ message: "Age is required" })
    .min(1, "Invalid age")
    .max(120, "Invalid age"),

  familySize: z.enum(["Single", "1-2", "3-4", "4+"]),

  familyMemberType: z.enum(["Adult", "Family", "Joint Family"]),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { data, isFetching, isLoading } = useAccountStore();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      age: undefined,
      familySize: undefined,
      familyMemberType: undefined,
    },
  });

  useEffect(() => {
    if (!data) return;
    form.setValue("firstName", data.first_name);
    form.setValue("lastName", data.last_name);
    form.setValue("mobile", data.mobile.replace("+91", ""));
  }, [data, isLoading, isFetching]);

  const onSubmit = (values: ProfileFormValues) => {
    console.log("PROFILE SUBMIT", values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-full xl:w-150 "
      >
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading || isFetching}
                  placeholder="Enter first name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading || isFetching}
                  placeholder="Enter last name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading || isFetching}
                  placeholder="Enter email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  disabled
                  placeholder="10-digit mobile number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Age */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading || isFetching}
                  type="number"
                  placeholder="Enter age"
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Family Size */}
        <FormField
          control={form.control}
          name="familySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family Size</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    disabled={isLoading || isFetching}
                    className="w-150"
                  >
                    <SelectValue placeholder="Select family size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="1-2">1–2</SelectItem>
                  <SelectItem value="3-4">3–4</SelectItem>
                  <SelectItem value="4+">4 or more</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Family Member Type */}
        <FormField
          control={form.control}
          name="familyMemberType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    disabled={isLoading || isFetching}
                    className="w-150"
                  >
                    <SelectValue placeholder="Select family type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Adult">Adult</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Joint Family">Joint Family</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className=" bg-maroon! hover:bg-maroon rounded-full"
        >
          Save Profile
        </Button>
      </form>
    </Form>
  );
}
