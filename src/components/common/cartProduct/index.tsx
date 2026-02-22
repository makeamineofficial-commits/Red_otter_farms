import { useCart } from "@/provider/cart.provider";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CartItem } from "@/types/cart";
import { Info, Minus, Plus, Trash2 } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCheckout } from "@/provider/checkout.provider";
import { isNCRPincode } from "@/lib/utils";
function ProductCard(item: CartItem & { availability?: boolean }) {
  const { quantity, product, variant, availability = true } = item;
  const { update, isUpdating, remove, lockCart } = useCart();
  const [localQty, setLocalQty] = useState(item.quantity);

  // Debounced server update
  const debouncedUpdate = useDebouncedCallback(
    (qty: number) => {
      if (lockCart) return;
      update({
        item,
        quantity: qty,
        toggle: false,
      });
    },
    400, // debounce delay (tweak as needed)
  );

  const increase = () => {
    if (lockCart) return;
    setLocalQty((q) => {
      const next = q + 1;
      debouncedUpdate(next);
      return next;
    });
  };

  const decrease = () => {
    if (lockCart) return;
    setLocalQty((q) => {
      if (q <= 1) return q;
      const next = q - 1;
      debouncedUpdate(next);
      return next;
    });
  };

  useEffect(() => {
    setLocalQty(quantity);
  }, [quantity]);

  return (
    <div className="border-b last:border-b-0 pb-2 flex gap-3 items-end relative ">
      {!availability && (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="absolute bottom-1 right-1 z-80 cursor-help text-xs underline decoration-dotted">
                  <Info className="size-4 text-red-500"></Info>
                </span>
              </TooltipTrigger>

              <TooltipContent className="max-w-75 text-xs leading-relaxed">
                This product is not available for delivery to the selected
                shipping location. Please change the address or remove the item
                to proceed.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
      <Link
        href={`/products/${product.slug}`}
        className="hover:underline  absolute h-full w-full z-40"
      ></Link>
      <button
        className="absolute top-2 right-2 z-60"
        disabled={lockCart}
        onClick={() => remove({ variantId: item.variant.publicId })}
      >
        <Trash2 size={15} className="text-destructive" />
      </button>

      <div className="relative">
        <Badge
          className="absolute bottom-1 right-1 z-10 
             max-w-12.5  cursor-pointer
             overflow-hidden whitespace-nowrap text-ellipsis 
             block text-left"
          title={item.variant.options.join(" | ")}
        >
          {item.variant.options.join(" | ")}
        </Badge>

        <div className="relative h-24 w-24 rounded-lg border overflow-hidden bg-muted">
          {product.assets?.[0]?.url && (
            <Image
              fill
              src={product.assets[0]?.url}
              alt={product.displayName}
              className="object-cover"
            />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col ">
        <span className="font-medium text-sm  w-[90%] overflow-clip capitalize">
          {product.displayName.trim().toLowerCase()}
        </span>

        {product.summary && (
          <span className="text-xs text-muted-foreground line-clamp-2 w-[90%]">
            {product.summary}
          </span>
        )}

        <div className="flex items-center justify-between mt-1 z-60">
          <div className="flex items-center gap-2 px-2 py-1 rounded-md border">
            <button
              onClick={decrease}
              disabled={localQty <= 1 || lockCart || product.hasSubscription}
              className="disabled:opacity-40"
            >
              <Minus size={14} />
            </button>

            <span
              className={`min-w-6 text-center text-sm font-medium ${localQty > variant.availableInStock ? "text-red-500" : ""} `}
            >
              {localQty}
            </span>

            <button
              onClick={increase}
              disabled={isUpdating || lockCart || product.hasSubscription}
              className="disabled:opacity-40"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartProductSkeleton() {
  return (
    <div className="border-b pb-2 flex gap-3 items-end animate-pulse">
      <div className="h-24 w-24 rounded-lg bg-muted" />

      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-3 w-1/2 bg-muted rounded" />

        <div className="flex items-center gap-3 mt-2">
          <div className="h-8 w-24 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export function Products() {
  const { cart, isLoading } = useCart();
  return (
    <div className=" flex flex-col pb-10 gap-2 flex-1  no-scrollbar overflow-y-auto ">
      {isLoading || !cart ? (
        <>
          {[1, 2, 3, 4].map((ele) => (
            <CartProductSkeleton key={ele} />
          ))}
        </>
      ) : (
        <>
          {cart?.items.length === 0 ? (
            <span className="uppercase text-muted-foreground text-sm text-center py-4">
              Cart is Empty
            </span>
          ) : (
            <></>
          )}
          {cart?.items.map((ele, idx) => (
            <ProductCard key={ele.variant.publicId} {...ele} />
          ))}
        </>
      )}
    </div>
  );
}

export function CheckoutProducts() {
  const { cart, isLoading } = useCart();
  const { shipping } = useCheckout();
  const isNCR = useMemo(() => {
    if (!shipping) return true;
    return isNCRPincode(shipping.zip);
  }, [shipping]);

  return (
    <div className=" flex flex-col pb-10 gap-2 flex-1  no-scrollbar overflow-y-auto ">
      {isLoading || !cart ? (
        <>
          {[1, 2, 3, 4].map((ele) => (
            <CartProductSkeleton key={ele} />
          ))}
        </>
      ) : (
        <>
          {cart?.items.length === 0 ? (
            <span className="uppercase text-muted-foreground text-sm text-center py-4">
              Cart is Empty
            </span>
          ) : (
            <></>
          )}
          {cart?.items.map((ele, idx) => (
            <ProductCard
              availability={isNCR || ele.product.isDrystore}
              key={ele.variant.publicId}
              {...ele}
            />
          ))}
        </>
      )}
    </div>
  );
}
