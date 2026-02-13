"use client";

import { useWishlistStore } from "@/store/user/wishlist.store";
import { WishlistCard, WishlistCardSkeleton } from "./card";

export default function Wishlist() {
  const { data, isLoading, isFetching } = useWishlistStore();

  return (
    <div className="flex flex-col gap-4">
      {isLoading || isFetching || !data ? (
        <>
          {[1, 2, 3, 4].map((ele) => (
            <WishlistCardSkeleton key={ele} />
          ))}
        </>
      ) : (
        <>
          {data.length === 0 && (
            <span className="text-sm text-muted-foreground my-4 text-center">
              No products present in Wishlist
            </span>
          )}
          {data.map((product, idx) => (
            <WishlistCard key={idx} product={product} />
          ))}
        </>
      )}
    </div>
  );
}
