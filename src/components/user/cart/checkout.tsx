import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/provider/cart.provider";

export default function Checkout() {
  const { cart, isLoading, isUpdating } = useCart();

  const total =
    cart?.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    ) ?? 0;

  const isDisabled =
    isLoading || isUpdating || !cart || cart.products.length === 0;

  return (
    <div className="bg-white w-full p-4 border-t">
      <Button
        className="w-full py-4 h-auto! text-base"
        size="lg"
        disabled={isDisabled}
      >
        {`Checkout ₹${formatPrice(total)}`}
      </Button>
    </div>
  );
}
