"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { variantSchema } from "../schema";
import { numberField } from "@/lib/utils";
import { useCreateVariant, useUpdateVariant } from "@/hooks/admin/variant.hook";
import { useParams } from "next/navigation";
import { useProductDetailsStore } from "@/store/admin/productDetail.store";
import { VariantOptionSelector } from "@/components/common/variantOptionSelector";
import { Variant } from "@/types/product";
import Link from "next/link";

type FormValues = z.infer<typeof variantSchema>;

export default function UpdateVariantForm({ variant }: { variant: Variant }) {
  const form = useForm({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      name: variant.name,
      sku: variant.sku,

      mrp: variant.mrp / 100,
      price: variant.price / 100,

      availableInStock: variant.availableInStock,
      stockLimit: variant.stockLimit,
      inStock: variant.inStock,

      weight: variant.weight,
      weightUnit: variant.weightUnit,
      length: variant.length,
      height: variant.height,
      breadth: variant.breadth,
      lengthUnit: variant.lengthUnit,
      breadthUnit: variant.breadthUnit,
      heightUnit: variant.heightUnit,

      isPublished: variant.isPublished,
      isDefault: variant.isDefault,

      options: variant.options,
    },
  });
  const onError = (errors: any) => {
    console.error("Validation errors:", errors);
  };

  const { mutateAsync, isPending } = useUpdateVariant();
  const { publicId: productId } = useParams();
  const onSubmit = async (values: FormValues) => {
    if (!productId) return;
    await mutateAsync({
      productId: productId.toString(),
      variantId: variant.publicId,
      ...values,
    });
  };
  const { data: product, isLoading, isFetching } = useProductDetailsStore();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-1">
            <Link href={`/admin/dashboard/product/${productId}/variant`}>
              <ChevronLeft></ChevronLeft>
            </Link>
            <h2 className="font-semibold text-lg">Update Variant</h2>
          </div>
          <div className="flex gap-2">
            <Button size={"sm"} type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className=" h-4 w-4 animate-spin" />
              ) : (
                <>Update Variant</>
              )}
            </Button>
          </div>
        </div>
        {/* ================= GENERAL INFO ================= */}
        <section className="space-y-4">
          <div>
            <h3 className="font-medium">General Information</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="sku"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="availableInStock"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available In Stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...numberField(field)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="stockLimit"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Threshold</FormLabel>
                  <FormControl>
                    <Input type="number" {...numberField(field)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* ================= PRICING ================= */}
        <section className="space-y-4">
          <h3 className="font-medium ">Pricing</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <FormField
              name="mrp"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MRP</FormLabel>
                  <FormControl>
                    <Input type="number" {...numberField(field)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...numberField(field)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Currency Code</FormLabel>
              <Input value={"INR"} disabled />
            </FormItem>
          </div>
        </section>

        {/* ================= DIMENSIONS & WEIGHT ================= */}
        <section className="space-y-4">
          <h3 className="font-medium ">Weight & Dimensions</h3>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              key={"weight"}
              name={"weight"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">Weight</FormLabel>
                  <FormControl>
                    <Input type="number" {...numberField(field)} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              key={"weightUnit"}
              name={"weightUnit"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">Weight Unit</FormLabel>
                  <FormControl>
                    <Input {...field} disabled readOnly />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {["height", "length", "breadth"].map((key) => (
              <FormField
                key={key}
                name={key as any}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{key}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}

            {[
              { key: "heightUnit", label: "Height Unit" },
              { key: "lengthUnit", label: "Lenght Unit" },
              {
                key: "breadthUnit",
                label: "Breadth Unit",
              },
            ].map((key) => (
              <FormField
                key={key.key}
                name={key.key as any}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{key.label}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-medium ">Product Status</h3>
          <div className="flex gap-4">
            {[
              { label: "Is Default", key: "isDefault" },
              { label: "In Stock", key: "inStock" },
              { label: "Is Published", key: "isPublished" },
            ].map((key) => (
              <FormField
                key={key.key}
                name={key.key as any}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="capitalize">{key.label}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </section>
        <FormField
          name="options"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <h3 className="font-medium ">Variant Options</h3>

              <FormControl>
                <VariantOptionSelector
                  value={field.value}
                  onChange={field.onChange}
                  options={product?.options || []}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
