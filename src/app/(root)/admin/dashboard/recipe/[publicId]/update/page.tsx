"use client";
import React from "react";
import { useRecipeDetailsStore } from "@/store/admin/recipeDetail.store";
import UpdateRecipeForm from "@/components/admin/recipe/update/form";
export default function page() {
  const { data, isFetching, isLoading } = useRecipeDetailsStore();

  if (!data || isFetching || isLoading) return <>Loading</>;
  return (
    <>
      <UpdateRecipeForm post={data}></UpdateRecipeForm>
    </>
  );
}
