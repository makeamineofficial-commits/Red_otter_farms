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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MultiSelect } from "@/components/common/multiSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TagInput } from "@/components/common/tagInput";
import FileUpload from "@/components/common/fileUpload";
import { productSchema } from "../schema";
import { useCreateProduct } from "@/hooks/admin/product.hook";
import { useAdminStore } from "@/store/admin/admin.store";
import { OptionsField } from "@/components/common/optionField";
import { KeyValueArrayField } from "@/components/common/keyValueArrayField";
import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { numberField } from "@/lib/utils";
import { FaqArrayField } from "@/components/common/faq";

type FormValues = z.infer<typeof productSchema>;

export default function CreateProductForm() {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      displayName: "",
      type: "",
      description: "",
      categories: [],
      healthBenefits: [],
      assets: [],
      isPublished: false,
      maxPrice: 0,
      minPrice: 0,
      faqs: [],
      isFeatured: false,
      isDryStore: false,
      // @ts-ignore
      nutritionalInfo: { key: 0 },
    },
  });
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateProduct();
  const { data, isLoading, isFetching } = useAdminStore();
  const onSubmit = async (values: FormValues) => {
    const res = await mutateAsync({
      // @ts-ignore
      nutritionalInfo: values.nutritionalInfo as unknown as Record<
        string,
        number
      >,
      ...values,
    });
    if (res.product) {
      router.push(
        `/admin/dashboard/product/${res.product?.publicId}/variant/create?new=true`,
      );
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Create Product</h2>
            <div className="flex gap-2">
              {/* <Button
              size={"sm"}
              variant={"outline"}
              type="submit"
              className="border border-black"
              disabled={isPending}
              >
              Save Draft
              </Button> */}
              <Button size={"sm"} type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className=" h-4 w-4 animate-spin" />
                ) : (
                  <>Create Product</>
                )}
              </Button>
            </div>
          </div>
          {/* ================= GENERAL INFO ================= */}
          <section className="space-y-4">
            <div>
              <h3 className="font-medium">General Information</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 ">
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
                name="displayName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                name="type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="categories"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <MultiSelect
                        {...field}
                        loading={isLoading || isFetching}
                        options={
                          data?.categories.map((ele) => {
                            return { label: ele.name, value: ele.publicId };
                          }) ?? []
                        }
                      ></MultiSelect>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="healthBenefits"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Health Benefits</FormLabel>
                  <FormControl>
                    <TagInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <section className="space-y-4 ">
            <h3 className="font-medium ">Price Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="minPrice"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...numberField(field)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="maxPrice"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...numberField(field)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
          {/* ================= ASSETS ================= */}
          <section className="space-y-4">
            <h3 className="font-medium ">Media</h3>

            <FormField
              name="assets"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onChange={(files) =>
                        field.onChange(
                          files.map((f, i) => ({
                            ...f,
                            position: i,
                            isPrimary: i === 0,
                          })),
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <section className="space-y-4">
            <FormField
              name="options"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <OptionsField
                      {...field}
                      // @ts-ignore
                      errors={form.formState.errors.options}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          {/* ================= NUTRITION ================= */}
          <section className="space-y-4">
            <h3 className="font-medium ">Nutrition Facts</h3>
            <FormField
              key={"nutritionalInfo"}
              name={"nutritionalInfo"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <KeyValueArrayField
                      value={field.value as Record<string, string>}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </section>

          <section className="space-y-4">
            <h3 className="font-medium ">FAQs</h3>

            <FormField
              key={"faqs"}
              name={"faqs"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FaqArrayField
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </section>
          {/* ================= FLAGS ================= */}
          <section className="space-y-3">
            <h3 className="font-medium ">Product Status</h3>
            <div className="flex gap-4">
              {[
                { label: "Is Published", key: "isPublished" },
                { label: "Is Featured", key: "isFeatured" },
                { label: "Is Drystore Product", key: "isDryStore" },
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
        </form>
      </Form>
    </FormProvider>
  );
}
