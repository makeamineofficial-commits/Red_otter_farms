"use client";

import { useCart } from "@/provider/cart.provider";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Floater() {
  const { cart } = useCart();

  const items = cart?.items || [];

  if (!items.length) return null;

  const previewItems = items.slice(0, 3);
  const extraCount = items.length - 3;

  return (
    <Link href="/checkout" className="block md:hidden">
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 min-w-45">
        <motion.div
          className="bg-forest shadow-xl h-14 px-3 rounded-full flex items-center gap-2"
          animate={{ scale: [1, 1.08, 1] }} // subtle bounce
          transition={{ duration: 0.25 }}
        >
          {/* Preview Images */}
          <div className="flex -space-x-6">
            <AnimatePresence>
              {previewItems.map((item) => {
                const image =
                  item.product.assets?.[0]?.url || "/placeholder.png";

                return (
                  <motion.img
                    key={item.variant.sku}
                    src={image}
                    alt={item.product.displayName}
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                );
              })}
            </AnimatePresence>

            {/* Extra Count */}
            {extraCount > 0 && (
              <div className="w-9 h-9 rounded-full bg-black/70 text-white text-xs flex items-center justify-center border-2 border-white">
                +{extraCount}
              </div>
            )}
          </div>

          <div className="flex flex-col  ml-1 text-white">
            <h2 className="text-sm font-medium">View Cart</h2>
            <span className="text-xs text-white/90 font-light whitespace-nowrap">
              {items.reduce((prev, cur) => prev + cur.quantity, 0)}{" "}
              {items.length === 1 ? "Item" : "Items"}
            </span>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}
