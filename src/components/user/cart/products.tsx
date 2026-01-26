import { useCart } from "@/provider/cart.provider";
import React from "react";
import Image from "next/image";
import { CartProduct } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
function ProductCard(product: CartProduct) {
  const { update, isUpdating, remove } = useCart();

  const increase = () => update({ product, quantity: product.quantity + 1 });

  const decrease = () => {
    if (product.quantity > 0) {
      update({ product, quantity: product.quantity - 1 });
    }
  };

  return (
    <div className="border-b pb-2 flex gap-3 items-end relative">
      <button
        className="absolute top-2 right-2"
        onClick={() => remove({ productPublicId: product.publicId })}
      >
        <Trash2 size={15} className="text-destructive"></Trash2>
      </button>

      <div className="relative h-24 w-24 rounded-lg border overflow-hidden bg-muted">
        {product.assets?.[0]?.url && (
          <Image
            fill
            src={product.assets[0].url}
            alt={product.displayName}
            className="object-cover"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-1">
        <span className="font-medium">{product.displayName}</span>
        {product.description && (
          <span className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </span>
        )}
        <div className="flex items-center justify-between mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2  px-2 py-1">
            <button
              onClick={decrease}
              disabled={isUpdating || product.quantity <= 1}
              className="disabled:opacity-40"
            >
              <Minus size={14} />
            </button>

            <span className="min-w-[24px] text-center text-sm font-medium">
              {product.quantity}
            </span>

            <button
              onClick={increase}
              disabled={isUpdating}
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
      {/* Image */}
      <div className="h-24 w-24 rounded-lg bg-muted" />

      {/* Content */}
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

export default function Products() {
  const { cart, isLoading, isUpdating } = useCart();
  return (
    <div className="p-4 flex flex-col gap-2">
      {isLoading || !cart ? (
        <>
          {[1, 2, 3, 4].map((ele) => (
            <CartProductSkeleton />
          ))}
        </>
      ) : (
        <>
          {cart?.products.map((ele) => (
            <ProductCard key={ele.publicId} {...ele} />
          ))}
        </>
      )}
    </div>
  );
}
