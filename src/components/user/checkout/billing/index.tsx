"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger2,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

import { ChevronsUpDown, Check } from "lucide-react";

import { useCheckout } from "@/provider/checkout.provider";
import { Button } from "@/components/ui/button";
import { states } from "@/types/account";

export default function Billing() {
  const { billing, setBilling } = useCheckout();
  const handleChange = (name: string, value: string | boolean) => {
    setBilling((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Accordion
      type="single"
      defaultValue="billing?"
      collapsible
      className="w-full border rounded-lg p-2 sm:p-4 md:p-6"
    >
      <AccordionItem value="billing?" className="border-none">
        <AccordionTrigger2 className="px-4! py-3! h-auto! justify-start!">
          <div
            className="
  h-5 w-5 rounded-full border-2 border-forest
   p-1 flex items-center justify-center
"
          >
            <div className="group-data-[state=open]:bg-forest p-1 rounded-full"></div>
          </div>
          <h2 className="text-xl! font-semibold!">Billing Information</h2>
        </AccordionTrigger2>

        <AccordionContent className=" px-4! py-2! sm:py-6! space-y-5 ">
          {/* Mobile */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">Mobile Number *</Label>
            <div className="flex gap-2">
              <Input value="+91" disabled className="w-14 h-12!" />
              <Input
                className="h-12!"
                placeholder="Enter mobile number"
                name="mobile"
                value={billing?.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-muted-foreground">First Name *</Label>
              <Input
                className="h-12!"
                value={billing?.firstName || ""}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground">Last Name *</Label>
              <Input
                className="h-12!"
                value={billing?.lastName || ""}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">Email (optional)</Label>
            <Input
              className="h-12!"
              type="email"
              value={billing?.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">Address *</Label>
            <Input
              className="h-12!"
              value={billing?.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Street *</Label>
            <Input
              className="h-12!"
              value={billing?.street || ""}
              onChange={(e) => handleChange("street", e.target.value)}
            />
          </div>

          {/* City */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">Town / City *</Label>
            <Input
              className="h-12!"
              value={billing?.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>

          {/* State */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">State *</Label>
            <Popover>
              <PopoverTrigger asChild className="w-full">
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between"
                >
                  {billing?.stateCode
                    ? states.find((s) => s.code === billing.stateCode)?.name
                    : "Select State"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
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
                            handleChange("state", state.name);
                            handleChange("stateCode", state.code);
                          }}
                        >
                          {state.name}
                          <Check
                            className={`ml-auto h-4 w-4 ${
                              state.code === billing?.stateCode
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
          </div>

          {/* ZIP */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">Postcode / ZIP *</Label>
            <Input
              className="h-12!"
              value={billing?.zip || ""}
              onChange={(e) => handleChange("zip", e.target.value)}
            />
          </div>

          {/* Country */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">Country</Label>
            <Input className="h-12!" value="India" readOnly disabled />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
