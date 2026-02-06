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
import { Textarea } from "@/components/ui/textarea";

import { useCheckout } from "@/provider/checkout.provider";

export default function Shipping() {
  const { shipping, setShipping } = useCheckout();

  const handleChange = (name: string, value: string) => {
    setShipping((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Accordion
      type="single"
      defaultValue="shipping"
      collapsible
      className="w-full border rounded-lg"
    >
      <AccordionItem value="shipping" className="border-none">
        <AccordionTrigger2 className="px-4! py-3! h-auto! justify-start!">
          <div
            className="
  h-5 w-5 rounded-full border-2 border-forest
   p-1 flex items-center justify-center
"
          >
            <div className="group-data-[state=open]:bg-forest p-1 rounded-full"></div>
          </div>
          <h2 className="text-lg! font-semibold!">Shipping Information</h2>
        </AccordionTrigger2>

        <AccordionContent className="px-4! py-6! space-y-5 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-muted-foreground">First Name</Label>
              <Input
                className="h-12!"
                value={shipping.firstName || ""}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground">Last Name</Label>
              <Input
                className="h-12!"
                value={shipping.lastName || ""}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">
              Phone for Delivery (House Help / Guard)
            </Label>
            <Input
              className="h-12!"
              value={shipping.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Street Address *</Label>
            <Input
              className="h-12!"
              value={shipping.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Town / City *</Label>
            <Input
              className="h-12!"
              value={shipping.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">State *</Label>
            <Select
              value={shipping.state}
              onValueChange={(value) => handleChange("state", value)}
            >
              <SelectTrigger className="h-12!">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Punjab">Punjab</SelectItem>
                <SelectItem value="Haryana">Haryana</SelectItem>
                <SelectItem value="UP">Uttar Pradesh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Postcode / ZIP *</Label>
            <Input
              className="h-12!"
              value={shipping.zip || ""}
              onChange={(e) => handleChange("zip", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Country</Label>
            <Input className="h-12!" value="India" disabled />
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">
              Order notes (optional)
            </Label>
            <Textarea
              rows={10}
              className="h-10"
              placeholder="Notes about your order, e.g. special notes for delivery."
              value={shipping.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
