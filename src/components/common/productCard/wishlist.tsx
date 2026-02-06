"use client";

import { Heart } from "lucide-react";
import { updateWishlist } from "@/actions/user/wishlist/update.action";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { Product, ProductPreview } from "@/types/product";
export default function Wishlist({
  presentInWishlist,
  productId,
}: ProductPreview) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isSelected, setSelected] = useState(presentInWishlist);

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white shadow-sm h-8 w-8 rounded-full p-2 flex items-center justify-center">
        <button
          disabled={loading}
          onClick={async () => {
            try {
              setLoading(true);
              const res = await updateWishlist({ productId });
              if (res.authenticationRequired) {
                router.push(`${pathname}?login=true`);
                return;
              }
              if (!res.success) {
                toast.warning("Failed to mark product in wishlist");
                return;
              }
              setSelected((prev) => !prev);
              toast.info(res.message);
            } catch (err) {
              toast.warning("Failed to mark product in wishlist");
            } finally {
              setLoading(false);
            }
          }}
        >
          <Heart
            className={`stroke-1  transition-colors size-5 ${
              isSelected ? "fill-red-500 stroke-red-500" : "fill-transparent"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
