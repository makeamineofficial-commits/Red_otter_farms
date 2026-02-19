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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";

import { ChevronsUpDown, Check, Pencil } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, Tag } from "lucide-react";
import { addressSchema } from "../schema";
import { useAddAddress, useEditAddress } from "@/hooks/user/use-address";
import { useState } from "react";
import { Address, AddressLabels, AddressTags, states } from "@/types/account";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

type AddressFormValues = z.infer<typeof addressSchema>;

export default function AddressForm({ address }: { address: Address }) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: address.address,
      street: address.street,
      attention: address.attention,
      zip: address.zip,
      city: address.city,
      stateCode: address.stateCode,
      tag: address.tag,
      label: address.label,
      customLabel: address.customLabel,
      countryCode: address.countryCode,
    },
  });

  const { mutateAsync } = useEditAddress();

  async function onSubmit(values: AddressFormValues) {
    await mutateAsync({ publicId: address.publicId, ...values });
    form.reset();
  }
  const [isOpen, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Pencil size={15} className="stroke-1 text-muted-foreground"></Pencil>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] overflow-auto">
        <div className="flex flex-col gap-2 sm:gap-4">
          <div>
            <h2 className="text-lg font-semibold">Edit Address</h2>
            <p className="text-sm text-muted-foreground">
              Use a permanent address where you can receive deliveries
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
                  name="street"
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
                <div className="grid grid-cols-1 sm:grid-cols-2  gap-2 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="zip"
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
                    name="stateCode"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>State</FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="justify-between"
                              >
                                {field.value
                                  ? states.find((s) => s.code === field.value)
                                      ?.name
                                  : "Select State"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>

                          <PopoverContent className="p-0 w-(--radix-popover-trigger-width)">
                            <Command>
                              <CommandInput placeholder="Search state..." />

                              <CommandList>
                                <CommandEmpty>No state found.</CommandEmpty>

                                <CommandGroup>
                                  {states.map((state) => (
                                    <CommandItem
                                      key={state.code}
                                      value={state.name}
                                      onSelect={() => {
                                        field.onChange(state.code);
                                      }}
                                    >
                                      {state.name}
                                      <Check
                                        className={`ml-auto h-4 w-4 ${
                                          state.code === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            value={"India"}
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
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Set address as</FormLabel>

                      <div className="flex gap-3 flex-wrap">
                        {AddressTags.map((item) => {
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

                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Save address as</FormLabel>

                      <div className="flex gap-3 flex-wrap">
                        {AddressLabels.map((item) => {
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

                {form.watch("label") === "CUSTOM" && (
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
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    Save Address
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
