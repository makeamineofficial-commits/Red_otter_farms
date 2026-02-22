"use client";

import Image from "next/image";
import { useRef, useState } from "react";

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
import { upload } from "@/actions/image/upload.action";
const indianMobileRegex = /^[6-9]\d{9}$/;
import { updateAccount } from "@/actions/user/account/update.action";
import { toast } from "sonner";
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

  family_size: z.enum(["Single", "1-2", "3-4", "4+"]),
  gender: z.enum(["Male", "Femail"]),
  family_members: z.enum(["Adult", "Family", "Joint Family"]),
  profile_pic: z.string().optional(),
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
      family_size: undefined,
      family_members: undefined,
      profile_pic: undefined,
    },
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | undefined>(
    form.getValues("profile_pic"),
  );
  useEffect(() => {
    if (!data) return;

    // @ts-ignore
    form.reset({
      firstName:
        data.first_name && data.first_name !== "null" ? data.first_name : "",

      lastName:
        data.last_name && data.last_name !== "null" ? data.last_name : "",

      email: data.email && data.email !== "null" ? data.email : "",

      mobile:
        data.mobile && data.mobile !== "null"
          ? data.mobile.replace("+91", "")
          : "",

      age: data.age ? Number(data.age) : undefined,

      family_size:
        data.family_size && data.family_size !== "null"
          ? data.family_size
          : undefined,

      gender: data.gender && data.gender !== "null" ? data.gender : undefined,

      // 👇 Important Part
      family_members:
        Array.isArray(data.family_members) && data.family_members.length > 0
          ? data.family_members[0]
          : undefined,

      profile_pic:
        data.profile_pic && data.profile_pic !== "null"
          ? data.profile_pic
          : undefined,
    });

    setPreview(
      data.profile_pic && data.profile_pic !== "null"
        ? data.profile_pic
        : undefined,
    );
  }, [data, isLoading, isFetching]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const { family_members, age, ...rest } = values;
      const { message, success } = await updateAccount({
        family_members: Array(family_members),
        age: age.toString(),
        ...rest,
      });

      if (success) {
        toast.info(message);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Failed to update account");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const res = await upload(file);

    if (res.success && res.url) {
      form.setValue("profile_pic", res.url);
      setPreview(res.url);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 flex gap-5 xl:gap-20 xl:flex-row flex-col-reverse items-center sm:items-start"
      >
        <div className="space-y-5 w-full xl:w-150 ">
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
            name="family_size"
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

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      disabled={isLoading || isFetching}
                      className="w-150"
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Family Member Type */}
          <FormField
            control={form.control}
            name="family_members"
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
            disabled={isFetching || isLoading || form.formState.isSubmitting}
            type="submit"
            className=" bg-maroon! hover:bg-maroon rounded-full"
          >
            Save Profile
          </Button>
        </div>
        <div className="flex gap-2 items-center flex-col ">
          <div className="w-56 h-56 border rounded-full border-black overflow-hidden relative">
            {preview ? (
              <Image
                src={preview}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                No Image
              </div>
            )}
          </div>
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              hidden
            />

            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="border-maroon rounded-full text-maroon hover:text-white! bg-white! hover:bg-maroon!"
            >
              Change Photo
            </Button>
          </>
        </div>
      </form>
    </Form>
  );
}
