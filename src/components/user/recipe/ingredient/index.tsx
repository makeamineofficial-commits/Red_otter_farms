import { useState } from "react";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { useCart } from "@/provider/cart.provider";
import { toast } from "sonner";
export default function Ingredients({
  ingredients,
  listedIngredients,
}: Recipe) {
  const [added, setAdded] = useState(false);

  const { isLoading, isUpdating, updateMany } = useCart();

  const handleClick = async () => {
    try {
      await updateMany({
        items: listedIngredients.map((ele) => {
          return {
            item: ele,
            quantity: ele.quantity,
          };
        }),
      });
      setAdded(true);
      toast.info("Ingredients added to cart");
    } catch (err) {
      toast.error("Failed to add ingredients to cart");
    }
  };

  return (
    <div className="space-y-6  bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold">Ingredients</h2>

      <ul className="space-y-2 text-sm">
        {ingredients.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <CheckCircle2 className="size-4 text-forest mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Button
        disabled={added || isLoading || isUpdating}
        onClick={() => handleClick()}
        className="bg-forest! text-white! hover:bg-forest! hover:text-white! w-full"
      >
        <ShoppingCart></ShoppingCart>
        Shop Ingredients
      </Button>
    </div>
  );
}
