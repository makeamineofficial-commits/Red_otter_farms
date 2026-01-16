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
import { useUpdateCollection } from "@/hooks/admin/collection.hook";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Collection } from "@/types/collection";
const collectionSchema = z.object({
  name: z.string().min(5).max(120),
  displayName: z.string().min(5).max(120),
  description: z.string().optional(),
  isPublished: z.boolean(),
});

type FormValues = z.infer<typeof collectionSchema>;

export default function UpdateCollectionForm({
  collection,
}: {
  collection: Collection;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: collection.name,
      displayName: collection.displayName,
      description: collection.description,
      isPublished: collection.isPublished,
    },
  });

  const { mutateAsync, isPending } = useUpdateCollection();
  const onSubmit = async (values: FormValues) => {
    await mutateAsync({
      ...values,
      slug: collection.slug,
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
                    placeholder="Enter collection name..."
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
                    placeholder="Enter collection display name..."
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-48"
                  rows={20}
                  placeholder="Enter collection description..."
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

              <FormLabel>Publish Collection</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin duration-200" />
          ) : (
            "Update Collection"
          )}
        </Button>
      </form>
    </Form>
  );
}
