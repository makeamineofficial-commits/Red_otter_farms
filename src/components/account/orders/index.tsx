"use client";

import { Package } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function OrderCard({ orderId }: { orderId: number }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value={`order-${orderId}`}
        className="border-none bg-muted/30  rounded-lg "
      >
        {/* Header */}
        <AccordionTrigger className="hover:no-underline p-0" showCross={false}>
          <div className=" p-3 flex items-center justify-between w-full">
            <div className="flex gap-2">
              <div className="bg-maroon/10 text-maroon flex items-center h-10 w-10 rounded-full justify-center">
                <Package size={18} />
              </div>

              <div className="flex gap-1 flex-col text-left">
                <h2 className="text-sm font-medium">Order Delivered</h2>
                <span className="text-xs text-muted-foreground">
                  Weekly Fresh Box - 5kg
                </span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">2 days ago</div>
          </div>
        </AccordionTrigger>

        {/* Content */}
        <AccordionContent className="pt-4 px-2">
          <div className="space-y-4">
            {/* Product 1 */}
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <div className="h-12 w-12 bg-muted rounded-md" />
                <div>
                  <p className="text-sm font-medium">Organic Tomatoes</p>
                  <p className="text-xs text-muted-foreground">1x</p>
                </div>
              </div>
              <p className="text-sm font-medium">₹120</p>
            </div>

            {/* Product 2 */}
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <div className="h-12 w-12 bg-muted rounded-md" />
                <div>
                  <p className="text-sm font-medium">Fresh Potatoes</p>
                  <p className="text-xs text-muted-foreground">2x</p>
                </div>
              </div>
              <p className="text-sm font-medium">₹180</p>
            </div>

            {/* Divider */}
            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹300</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Charges</span>
                <span>₹40</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>₹20</span>
              </div>

              <div className="flex justify-between font-medium pt-2">
                <span>Total</span>
                <span>₹360</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function Order() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4, 5].map((id) => (
        <OrderCard key={id} orderId={id} />
      ))}
    </div>
  );
}
