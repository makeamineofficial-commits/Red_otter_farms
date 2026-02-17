"use client";
import { useCart } from "@/provider/cart.provider";
import { ProductPreview } from "@/types/product";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Share2 } from "lucide-react";
import { convertToCartItem } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function RecommendedProducts({
  products,
}: {
  products: ProductPreview[];
}) {
  return (
    <section className="mb-20">
      {/* Header */}
      <div className="flex justify-between items-end mb-4 md:mb-12 flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-[4px] mb-2">Our Picks</p>

          <h2 className="font-dream-orphans text-forest  text-[2rem] lg:text-[3.5rem] 2xl:text-[4.75rem]">
            Explore More
          </h2>
        </div>

        <button className="bg-[#d7262d] hidden sm:flex  text-white px-8 py-4 rounded-[10px] font-bold gap-2">
          Shop All
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard {...product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard(product: ProductPreview) {
  const { stockLimit, availableInStock, inStock } = product;
  const { update, cart, remove, discount } = useCart();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!cart) return;

    const count = cart.items.find(
      (ele) => ele.variant.publicId === product.variantId,
    )?.quantity;

    if (count) {
      setCount(count);
    }
  }, [cart]);

  return (
    <>
      <div
        key={product.productId}
        className="border-2 border-[#004b1a] rounded-lg overflow-hidden group hover:shadow-xl relative"
      >
        {stockLimit > availableInStock ? (
          <>
            <div className="absolute top-7 -left-9 z-40 -rotate-45 bg-maroon py-1 px-10 text-white text-xs font-semibold shadow-md">
              Low In Stock
            </div>
          </>
        ) : (
          <></>
        )}

        {!inStock ? (
          <>
            <div className="absolute top-7 -left-9 z-50 -rotate-45 bg-maroon py-1 px-10 text-white text-xs font-semibold shadow-md">
              Out Of Stock
            </div>
          </>
        ) : (
          <></>
        )}
        <Link
          href={`/products/${product.slug}`}
          className="absolute top-0 left-0  h-full w-full  z-10"
        ></Link>

        <div className="aspect-square relative bg-[#edefea] overflow-hidden">
          <Image
            fill
            src={product.assets[0].url}
            alt={product.displayName}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary">{product.variantOption.join("|")}</Badge>
            {product.variants > 1 && (
              <Badge variant="secondary" className="text-xs capitalize ml-2">
                +{product.variants - 1}
              </Badge>
            )}
          </div>
        </div>

        <div className="p-4 ">
          <div className="flex justify-between items-center">
            <h3 className=" font-bold uppercase text-base sm:text-lg line-clamp-1 sm:line-clamp-2">
              {product.displayName}
            </h3>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <span className="font-bold  text-sm sm:text-base text-[#004b1a]">
              ₹{(product.price / 100).toFixed(2)}
            </span>

            <div className="items-center justify-end gap-2 relative z-10 mt-auto h-10  flex ">
              <AnimatePresence mode="wait">
                {count > 0 ? (
                  /* Quantity Controls */
                  <motion.div
                    key="counter"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center border border-maroon rounded-lg"
                  >
                    <Button
                      disabled={!inStock}
                      size="sm"
                      variant="ghost"
                      className=""
                      onClick={() => {
                        setCount((prev) => Math.max(0, prev - 1));
                        if (count === 1) {
                          remove({ variantId: product.variantId });
                        } else {
                          update({
                            toggle: false,
                            item: convertToCartItem(product),
                            quantity: Math.max(1, count - 1),
                          });
                        }
                      }}
                    >
                      <Minus className="size-2" />
                    </Button>

                    <span className="px-2 w-6 text-sm">{count}</span>

                    <Button
                      disabled={!inStock}
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setCount((prev) => prev + 1);
                        update({
                          toggle: false,
                          item: convertToCartItem(product),
                          quantity: count + 1,
                        });
                      }}
                    >
                      <Plus className="size-2" />
                    </Button>
                  </motion.div>
                ) : (
                  /* Add Button */
                  <motion.div
                    key="add"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      disabled={!inStock}
                      size="sm"
                      className="bg-transparent border text-sm! border-maroon text-maroon hover:bg-maroon hover:text-white rounded-lg px-4"
                      onClick={() => {
                        setCount(1);
                        update({
                          toggle: false,
                          item: convertToCartItem(product),
                          quantity: 1,
                        });
                      }}
                    >
                      Add
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
