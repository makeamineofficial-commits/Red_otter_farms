import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
export default function OrderSummary({
  subTotal,
  discount,
  shipping,
  total,
}: any) {
  return (
    <div className="lg:sticky lg:top-50 h-fit">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-[4px] mb-2">
          Bill Details
        </div>

        <h2 className="text-[#004b1a] font-dream-orphans text-4xl tracking-[3px]">
          Summary
        </h2>
      </div>

      <div className="border-2 border-[#004b1a] rounded-lg p-6 bg-[#edefea]">
        <div className="space-y-4">
          <Row label="Subtotal" value={subTotal} />

          <Row label="Discount" value={-discount} red />

          <Row label="Shipping" value={shipping} />

          <hr />

          <div className="flex justify-between items-baseline">
            <span className="font-bold uppercase">Total</span>

            <span className="font-bold text-[#004b1a] text-3xl">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>
        <Link href={"/categories"}>
          <button className="bg-[#d7262d] text-white px-10 py-4 rounded-[10px] font-bold flex gap-2 items-center w-full mt-5 justify-center">
            Continue Shopping
            <ShoppingBag size={18} />
          </button>
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value, red }: any) {
  return (
    <div
      className={`flex justify-between items-center ${red ? "text-[#d7262d]" : ""}`}
    >
      <span className="uppercase text-sm ">{label}</span>
      <span className="font-bold">
        ₹{red && "-"}
        {Math.abs(value).toFixed(2)}
      </span>
    </div>
  );
}
