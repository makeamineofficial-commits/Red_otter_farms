"use client";
import React from "react";
import { usePostDetailsStore } from "@/store/admin/postDetail.store";
import UpdatePostForm from "@/components/admin/post/update/form";
export default function page() {
  const { data, isFetching, isLoading } = usePostDetailsStore();

  if (!data || isFetching || isLoading) return <>Loading</>;
  return (
    <>
      <UpdatePostForm post={data}></UpdatePostForm>
    </>
  );
}
