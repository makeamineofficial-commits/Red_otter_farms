"use client";

import { OrderCard, OrderCardSkeleton } from "./card";
import { useOrderStore } from "@/store/user/order.store";

export default function Order() {
  const { data, isLoading, isFetching } = useOrderStore();

  return (
    <div className="flex flex-col gap-4">
      {isLoading || isFetching || !data ? (
        <>
          {[1, 2, 3, 4].map((ele) => (
            <OrderCardSkeleton key={ele} />
          ))}
        </>
      ) : (
        <>
          {data.length === 0 && (
            <span className="text-sm text-muted-foreground my-4 text-center">
              No Orders yet
            </span>
          )}
          {data.map((order, idx) => (
            <OrderCard key={idx} order={order} />
          ))}
        </>
      )}
    </div>
  );
}
