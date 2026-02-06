"use client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/provider/cart.provider";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart, isLoading, isUpdating, toggle } = useCart();
  const total =
    cart?.items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0) ?? 0;

  const { push } = useRouter();
  const isDisabled = isLoading || isUpdating || !cart || cart.items.length === 0;

  return (
    <div className="bg-white w-full p-4 border-t">
      <Button
        onClick={() => {
          if (isLoading || isUpdating || !cart) return;
          push("/checkout");
          toggle();
        }}
        className="w-full py-4 h-auto! text-base text-forest bg-white border-forest hover:bg-forest hover:text-white"
        size="lg"
        variant={"outline"}
        disabled={isDisabled}
      >
        {`Checkout ₹${formatPrice(total)}`}
      </Button>
    </div>
  );
}
