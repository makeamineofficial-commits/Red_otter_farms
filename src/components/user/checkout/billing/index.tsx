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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCheckout } from "@/provider/checkout.provider";

export default function Billing() {
  const { billing, setBilling } = useCheckout();

  const handleChange = (name: string, value: string) => {
    setBilling((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Accordion
      type="single"
      defaultValue="billing"
      collapsible
      className="w-full border rounded-lg p-6"
    >
      <AccordionItem value="billing" className="border-none">
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

        <AccordionContent className="px-4! py-6! space-y-5 ">
          {/* Mobile */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">Mobile Number *</Label>
            <div className="flex gap-2">
              <Input value="+91" disabled className="w-20 h-12!" />
              <Input
                className="h-12!"
                placeholder="Enter mobile number"
                name="mobile"
                value={billing.mobile || ""}
                onChange={(e) => handleChange("mobile", e.target.value)}
              />
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-muted-foreground">First Name *</Label>
              <Input
                className="h-12!"
                value={billing.firstName || ""}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground">Last Name *</Label>
              <Input
                className="h-12!"
                value={billing.lastName || ""}
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
              value={billing.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">Street Address *</Label>
            <Input
              className="h-12!"
              value={billing.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          {/* City */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">Town / City *</Label>
            <Input
              className="h-12!"
              value={billing.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>

          {/* State */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">State *</Label>
            <Select
              value={billing.state}
              onValueChange={(value) => handleChange("state", value)}
            >
              <SelectTrigger className="w-full h-12!">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="Delhi">Delhi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ZIP */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">Postcode / ZIP *</Label>
            <Input
              className="h-12!"
              value={billing.zip || ""}
              onChange={(e) => handleChange("zip", e.target.value)}
            />
          </div>

          {/* Country */}
          <div className="space-y-1">
            <Label className="text-muted-foreground">Country</Label>
            <Input className="h-12!" value="India" disabled />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
