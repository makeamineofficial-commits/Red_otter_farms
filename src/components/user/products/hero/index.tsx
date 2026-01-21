import { Button } from "@/components/ui/button";
import Count from "./count";
import Nutrition from "./nutrition";
import { ChefHat, Share, Share2, Star } from "lucide-react";
import Benefit from "./benefit";
export default function Hero() {
  return (
    <article className="w-full xl:min-w-150 space-y-2">
      <h2 className="uppercase font-semibold text-[0.875rem] tracking-[0.6px]">
        Organic
      </h2>

      <Nutrition></Nutrition>

      <h1 className="text-[2.375rem] leading-[120%]">
        <span>Organic Hass Avocados - Premium Box </span>
      </h1>
      <p className="text-[1.125rem] font-light">
        Creamy, nutrient-dense organic avocados hand-picked from Ojai Valley.
      </p>

      <div className="mt-13">
        <div className="flex items-center gap-4.5">
          <p className="text-[1.875rem] font-bold">₹24.99</p>
          <p className="text-muted-foreground line-through">₹29.00</p>
        </div>
      </div>

      <Benefit></Benefit>

      <div className="flex items-center justify-center gap-4 flex-col w-full mt-4">
        <div className="flex w-full flex-col justify-between sm:flex-row gap-3">
          <Count />

          <Button
            size="lg"
            className="
      h-14 font-bold
      w-full 
      sm:flex-1 sm:max-w-56
    "
          >
            Add to Cart
          </Button>
        </div>

        <Button
          variant={"outline"}
          className="w-full h-14!  border-black border-2 font-bold"
          size="lg"
        >
          Subscribe (₹21.5)
        </Button>
        <div className="bg-muted flex items-center gap-3.25 w-full p-3 rounded-md">
          <div className="bg-muted-foreground/10 flex items-center rounded-full justify-center p-2">
            <Star className="fill-black"></Star>
          </div>

          <div className="text-[0.75rem]">
            <h2 className="font-bold">Loyalty Reward</h2>
            <p>Earn 50 pts with this purchase</p>
          </div>
        </div>

        <div className="border-2 rounded-md border-black p-3 w-full">
          <h2 className="flex items-center gap-2 font-bold">
            <ChefHat></ChefHat>
            <span>Recipe Ideas</span>
          </h2>

          <ul className="list-disc pl-5 mt-4 text-[0.875rem] font-light tracking-[0%] flex flex-col gap-2">
            <li>Classic Guacamole</li>
            <li>Avocado Toast with Poached Egg</li>
            <li>Green Smoothie Bowl</li>
          </ul>
        </div>
      </div>
      <p className="text-[0.875rem] mt-5 text-muted-foreground">
        <strong>Best For:</strong> Salads, Toast Topping, Smoothies, Baby Food,
        Farm Origin, Based on IFCT 2017 standards.
      </p>

      <div className="text-muted-foreground flex gap-2 items-center mt-6">
        <Share2></Share2>
        <p>Share with family and friends</p>
      </div>
    </article>
  );
}
