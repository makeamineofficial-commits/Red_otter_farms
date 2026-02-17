"use client";
import { useCart } from "@/provider/cart.provider";
import Image from "next/image";

interface Product {
  displayName: string;
  price: number;
  quantity: number;
  assets: { url: string }[];
}

export default function OrderItems({ products }: { products: Product[] }) {
  const { discount } = useCart();
  return (
    <div>
      <div className="mb-6">
        <div className="text-xs uppercase tracking-[4px] mb-2">Your Items</div>

        <h2 className="text-forest text-4xl md:text-5xl tracking-[3px] font-dream-orphans">
          Order Details
        </h2>
      </div>

      <div className="border-2 border-forest rounded-lg overflow-hidden">
        {products.map((item, i) => (
          <div
            key={i}
            className={`flex gap-6 p-6 ${
              i !== products.length - 1 ? "border-b border-forest" : ""
            }`}
          >
            <div className="w-28 h-28 rounded-lg overflow-hidden bg-[#edefea] relative">
              <Image
                src={item.assets[0]?.url || "/placeholder.png"}
                fill
                className="object-cover"
                alt={item.displayName}
              />
            </div>

            <div className="flex-1">
              <h3 className="font-bold uppercase mb-2">{item.displayName}</h3>

              <p>Quantity: {item.quantity}</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-forest text-xl">
                ₹{((item.price / 100) * discount * item.quantity).toFixed(2)}
              </p>

              <p className="text-sm mt-1">
                {" "}
                ₹{((item.price / 100) * discount * item.quantity).toFixed(
                  2,
                )}{" "}
                each
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
