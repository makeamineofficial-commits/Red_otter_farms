import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function ContinueShopping() {
  return (
    <section className="border-2 border-[#004b1a] rounded-lg p-12 text-center bg-linear-to-br from-[#edefea] to-white">
      <ShoppingBag size={64} className="text-[#d7262d] mx-auto mb-6" />

      <h2 className="font-['Dream_Orphans'] text-5xl text-[#004b1a] tracking-[3px] mb-4">
        Want to Add More?
      </h2>

      <p className="font-['Inter'] text-lg max-w-2xl mx-auto mb-8">
        Continue shopping and explore more fresh products.
      </p>

      <div className="flex flex-col items-center w-full gap-4 justify-center">
        <Link href={"/categories"}>
          <button className="bg-[#d7262d] text-white px-10 py-4 rounded-[10px] font-bold flex gap-2 items-center justify-center">
            Continue Shopping
            <ShoppingBag size={18} />
          </button>
        </Link>
      </div>
    </section>
  );
}
