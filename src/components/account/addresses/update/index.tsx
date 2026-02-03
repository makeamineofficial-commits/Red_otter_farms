"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import { Address } from "@/types/account";
import { useEditAddress } from "@/hooks/user/use-address";

const LABELS = [
  { value: "HOME", label: "Home" },
  { value: "WORK", label: "Work" },
  { value: "CUSTOM", label: "Other" },
];
const addressSchema = z
  .object({
    address: z.string().min(10),
    street2: z.string().min(10),
    zip_code: z.string().regex(/^[0-9]{6}$/),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
    labelType: z.enum(["HOME", "WORK", "CUSTOM"]),
    customLabel: z.string().optional(),
    attention: z.string().optional(),
  })
  .refine((data) => data.labelType !== "CUSTOM" || !!data.customLabel?.trim(), {
    path: ["customLabel"],
    message: "Please enter a custom label",
  });

type AddressFormValues = z.infer<typeof addressSchema>;

export default function UpdateAddressForm({
  address,
  street2,
  attention,
  zip,
  city,
  state,
  customLabel,
  label,
  address_id,
}: Address) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address,
      street2,
      attention,
      zip_code: zip,
      city,
      state,
      labelType: label,
      customLabel: customLabel ?? undefined,
      country: "India",
    },
  });

  const { mutateAsync } = useEditAddress();

  async function onSubmit(values: AddressFormValues) {
    await mutateAsync({ address_id, ...values });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Pencil size={15} className="stroke-1 "></Pencil>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] overflow-auto">
        <div className="flex flex-col gap-2 sm:gap-4">
          <div>
            <h2 className="text-lg font-semibold">Update Address</h2>
            <p className="text-sm text-muted-foreground">
              Update this address to ensure deliveries continue without
              interruption.
            </p>
          </div>

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 md:space-y-6"
              >
                {/* Address Line 1 */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="House no, Building" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="street2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Street details" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pincode / City / State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="zip_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="201301" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Noida" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Uttar Pradesh" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            value={field.value || "India"}
                            readOnly
                            className="bg-muted"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="attention"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Any Delivery Instructions</FormLabel>
                      <FormControl>
                        <Textarea className="h-10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="labelType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Save address as</FormLabel>

                      <div className="flex gap-3 flex-wrap">
                        {LABELS.map((item) => {
                          const isActive = field.value === item.value;

                          return (
                            <Badge
                              key={item.value}
                              variant="outline"
                              className={`cursor-pointer px-4 py-2 text-sm rounded-full transition
                ${
                  isActive
                    ? "border-primary text-primary bg-primary/10"
                    : "text-muted-foreground"
                }
              `}
                              onClick={() => field.onChange(item.value)}
                            >
                              {item.label}
                            </Badge>
                          );
                        })}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("labelType") === "CUSTOM" && (
                  <FormField
                    control={form.control}
                    name="customLabel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom label</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Parents House"
                            autoFocus
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Save Address</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
