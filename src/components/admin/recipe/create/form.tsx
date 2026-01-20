"use client";
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
import { Editor } from "@/components/common/editor";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import FileUpload from "@/components/common/fileUpload";
import { AssetType } from "@/types/common";
import { useCreateRecipe } from "@/hooks/admin/recipe.hook";
const recipeSchema = z.object({
  title: z.string().min(5).max(120),
  summary: z.string().min(5).max(120),
  contentHTML: z.string(),
  isPublished: z.boolean(),
  sharableLink: z.string().url(),
  assets: z.array(
    z.object({
      url: z.string(),
      thumbnail: z.string(),
      type: z.nativeEnum(AssetType),
      position: z.number().int().nonnegative(),
      isPrimary: z.boolean(),
    }),
  ),
});

type FormValues = z.infer<typeof recipeSchema>;

export default function CreateRecipeForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      summary: "",
      contentHTML: "",
      sharableLink: "",
      isPublished: false,
      assets: [],
    },
  });

  const { mutateAsync, isPending } = useCreateRecipe();
  const onSubmit = async (values: FormValues) => {
    await mutateAsync({
      ...values,
    });
  };
  const onError = (errors: any) => {
    console.error("Validation errors:", errors);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-4 "
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Create Recipe</h2>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="animate-spin duration-200" />
            ) : (
              "Create Recipe"
            )}
          </Button>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Title for the recipe..."
                  {...field}
                />
              </FormControl>{" "}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assets</FormLabel>
              <FormControl>
                <FileUpload value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea
                  className="h-48"
                  rows={20}
                  placeholder="What the recipe all about..."
                  {...field}
                />
              </FormControl>{" "}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contentHTML"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Editor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sharableLink"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Sharable Link</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Sharable link for the recipe..."
                  {...field}
                />
              </FormControl>{" "}
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

              <FormLabel>Publish Recipe</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
