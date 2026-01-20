import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateCategory } from "@/hooks/admin/category.hook";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Category } from "@/types/category";
const categorySchema = z.object({
  name: z.string().min(5).max(120),
  displayName: z.string().min(5).max(120),
  description: z.string().optional(),
  isPublished: z.boolean(),
  slug: z.string(),
});

type FormValues = z.infer<typeof categorySchema>;

export default function UpdateCategoryForm({
  category,
}: {
  category: Category;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      displayName: category.displayName,
      description: category.description,
      isPublished: category.isPublished,
      slug: category.slug,
    },
  });

  const { mutateAsync, isPending } = useUpdateCategory();
  const onSubmit = async (values: FormValues) => {
    await mutateAsync({
      ...values,
      publicId: category.publicId,
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 overflow-hidden"
      >
        <div className="flex gap-2 items-center flex-col md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Enter category name..."
                    {...field}
                  />
                </FormControl>{" "}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Enter category display name..."
                    {...field}
                  />
                </FormControl>{" "}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Enter category slug..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-48"
                  rows={20}
                  placeholder="Enter category description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <FormLabel>Publish Category</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin duration-200" />
          ) : (
            "Update Category"
          )}
        </Button>
      </form>
    </Form>
  );
}
