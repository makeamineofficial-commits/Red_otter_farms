import { ProductPreview } from "@/types/product";
import React, { useState } from "react";
import { Loader2, Minus, Package, Plus, ShoppingCart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { convertToCartItem, formatPrice } from "@/lib/utils";
import { useCart } from "@/provider/cart.provider";
import { useRouter } from "next/navigation";
function formatDateWithOrdinal(dateStr: string) {
  const date = new Date(dateStr);

  const day = date.getDate(); // ❗ getDate(), not getDay()
  const year = date.getFullYear();

  const month = date.toLocaleString("en-US", { month: "short" });

  function getOrdinal(n: number) {
    if (n % 100 >= 11 && n % 100 <= 13) return "th";

    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return `${day}${getOrdinal(day)} of ${month} ${year}`;
}

function ProductCard({
  product,
  quantity,
}: {
  quantity: number;
  product: ProductPreview;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="h-12 w-12 bg-muted rounded-md relative overflow-hidden">
            <Image
              fill
              src={product.assets[0].url}
              alt={product.displayName}
            ></Image>
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium flex gap-2 ">
              {product.displayName} <span>{quantity}x</span>
            </p>
            <p></p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground flex md:text-sm">
          ₹{formatPrice(product.price)}
        </span>
      </div>
    </>
  );
}

export function OrderCard({
  order,
}: {
  order: SalesOrder & { products: ProductPreview[] };
}) {
  const { updateMany } = useCart();
  const {
    salesorder_id,
    products,
    sub_total,
    total,
    shipping_charge,
    discount,
    salesorder_number,
    created_date,
    line_items,
  } = order;
  const { push } = useRouter();
  const [isLoading, setLoading] = useState(false);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value={`order-${salesorder_id}`}
        className="border-none bg-muted/30  rounded-lg "
      >
        {/* Header */}

        <AccordionTrigger className=" px-1 md:px-4 relative " showCross={false}>
          <div className="flex gap-2">
            <div className="bg-maroon/10 text-maroon flex items-center h-10 w-10 rounded-full justify-center">
              <Package size={18} />
            </div>

            <div className="flex gap-1 flex-col text-left">
              <h2 className="text-xs md:text-sm font-medium">
                Order #{salesorder_number}
              </h2>
              <span className="text-[10px] md:text-xs text-muted-foreground">
                Ordered at {formatDateWithOrdinal(created_date)}
              </span>
            </div>
          </div>

          <div
            onClick={async (e) => {
              if (isLoading) return;
              try {
                e.stopPropagation();
                setLoading(true);
                updateMany({
                  toggle: false,
                  items: products
                    .map((ele) => {
                      if (!ele) return null;
                      return {
                        item: convertToCartItem(ele),
                        quantity:
                          line_items.find((item) => ele.sku === item.sku)
                            ?.quantity ?? 0,
                      };
                    })
                    .filter((ele) => !!ele),
                });
                push("/checkout");
              } catch (err) {
              } finally {
                setLoading(false);
              }
            }}
            className={`bg-maroon! z-50 absolute right-2 md:right-5 flex rounded-lg px-2 md:px-4 py-2 items-center text-xs text-white gap-2 ${isLoading ? "opacity-75 pointer-events-none" : ""}`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin duration-200" />
            ) : (
              <>
                <span className="hidden md:block">Reorder</span>
                <ShoppingCart className="size-4" />
              </>
            )}
          </div>
        </AccordionTrigger>

        {/* Button OUTSIDE trigger */}

        {/* Content */}
        <AccordionContent className="pt-4 px-2">
          <div className="space-y-4 px-1 md:px-4">
            {products.map((ele) => (
              <ProductCard
                product={ele}
                quantity={line_items.find((ele) => ele.sku)?.quantity || 0}
              />
            ))}

            {/* Divider */}
            <div className="border-t pt-3 space-y-2 text-xs md:text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{Number(sub_total).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Charges</span>
                <span>₹{Number(shipping_charge).toFixed(2)}</span>
              </div>

              {Number(discount) > 0 && (
                <>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Discount</span>
                    <span>₹{Number(discount).toFixed(2)}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between font-medium pt-2">
                <span>Total</span>
                <span>₹{Number(total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="w-full bg-muted/30 rounded-lg px-4 py-3 animate-pulse">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex gap-3 items-center">
          {/* Icon */}
          <div className="h-10 w-10 rounded-full bg-muted" />

          {/* Text */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-3 w-44 bg-muted rounded" />
          </div>
        </div>

        {/* Right Button */}
        <div className="h-8 w-24 bg-muted rounded-md" />
      </div>
    </div>
  );
}
