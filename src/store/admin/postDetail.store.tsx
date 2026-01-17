"use client";
import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/actions/admin/posts/get.action";
import { Post } from "@/types/post";
import { useParams } from "next/navigation";
interface StoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: Post | undefined;
  error: Error | null;
}

const StoreContext = createContext<StoreInterface | null>(null);

function StoreContent({ children }: { children: React.ReactNode }) {
  const { publicId } = useParams();
  const { isFetching, isError, isLoading, data, error } = useQuery<
    Post | undefined
  >({
    queryKey: ["post", publicId],
    queryFn: async () => {
      if (!publicId) return;
      const res = await getPost({
        publicId: publicId?.toString(),
      });
      return res.post;
    },
    enabled: !!publicId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <StoreContext.Provider
      value={{ isLoading, isError, isFetching, data, error }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const PostDetailsStore = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Suspense fallback={<></>}>
      <StoreContent>{children}</StoreContent>
    </Suspense>
  );
};

export const usePostDetailsStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error("usePostDetailsStore must be used inside PostDetailsStore");
  return ctx;
};
