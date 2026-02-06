"use client";
import UpdateVaraintForm from "@/components/admin/variant/update/form";
import { useProductDetailsStore } from "@/store/admin/productDetail.store";
import { useVariantDetailsStore } from "@/store/admin/variantDetail.store";
export default function page() {
  const { data, isFetching, isLoading } = useVariantDetailsStore();
  const {
    data: variant,
    isLoading: productLoading,
    isFetching: productFetching,
  } = useProductDetailsStore();
  console.log(data);
  if (
    !data ||
    !variant ||
    isFetching ||
    isLoading ||
    productFetching ||
    productLoading
  )
    return <>Loading</>;
  return (
    <>
      <UpdateVaraintForm variant={data}></UpdateVaraintForm>
    </>
  );
}
