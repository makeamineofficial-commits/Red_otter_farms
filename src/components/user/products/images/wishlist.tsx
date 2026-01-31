"use client";
import { useProductStore } from "@/store/user/product.store";
import { Heart } from "lucide-react";
import { updateWishlist } from "@/actions/user/wishlist/update.action";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
export default function Wishlist() {
  const { data, isLoading, isFetching } = useProductStore();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    if (!data) return;
    setSelected(data?.presentInWishlist);
  }, [data]);
  if (isLoading || isFetching || !data) return <></>;

  return (
    <div className="flex flex-col gap-2 absolute top-3 right-3 z-100">
      <div className="bg-white shadow-sm h-10 w-10 rounded-full p-2 flex items-center justify-center">
        <button
          disabled={isLoading || isFetching || !data || loading}
          onClick={async () => {
            console.log("hello");
            try {
              setSelected((prev) => !prev);
              setLoading(true);
              const res = await updateWishlist({ productId: data.publicId });
              if (res.authenticationRequired) {
                router.push(`${pathname}?login=true`);
                return;
              }
              if (!res.success) {
                toast.warning("Failed to mark product in wishlist");
                return;
              }
              toast.info(res.message);
            } catch (err) {
              toast.warning("Failed to mark product in wishlist");
            } finally {
              setLoading(false);
            }
          }}
        >
          <Heart
            className={`stroke-1 transition-colors ${
              isSelected
                ? "fill-red-500 stroke-red-500"
                : "fill-transparent stroke-gray-500"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
