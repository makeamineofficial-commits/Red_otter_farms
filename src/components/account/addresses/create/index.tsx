"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

/* ---------------- Schema ---------------- */

const addressSchema = z.object({
  addressLine1: z.string().min(10, "Address must be at least 10 characters"),
  addressLine2: z.string().optional(),
  pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  label: z.enum(["home", "office", "other", "none"]).optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

/* ---------------- Component ---------------- */

export default function AddressForm() {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      pincode: "",
      city: "",
      state: "",
      label: "none",
    },
  });

  function onSubmit(values: AddressFormValues) {
    console.log("Address Submitted:", values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="min-h-30 w-full rounded-2xl  border flex justify-center flex-col gap-2 items-center">
          <div className="p-2 border rounded-full">
            <Plus size={30} className="text-muted-foreground/40"></Plus>
          </div>

          <p className="text-muted-foreground text-xs">Add Address</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold">Add Address</h2>
            <p className="text-sm text-muted-foreground">
              Use a permanent address where you can receive deliveries
            </p>
          </div>

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Address Line 1 */}
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="House no, Building, Street"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address Line 2 */}
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Area, Landmark (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pincode / City / State */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="pincode"
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
                </div>

                {/* Address Label */}
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Save address as</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          {[
                            { value: "home", label: "Home" },
                            { value: "office", label: "Office" },
                            { value: "other", label: "Other" },
                            { value: "none", label: "None" },
                          ].map((item) => (
                            <div
                              key={item.value}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={item.value}
                                id={item.value}
                              />
                              <FormLabel
                                htmlFor={item.value}
                                className="font-normal"
                              >
                                {item.label}
                              </FormLabel>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
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
