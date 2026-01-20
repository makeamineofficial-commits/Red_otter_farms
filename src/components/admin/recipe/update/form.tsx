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
import { useUpdateRecipe } from "@/hooks/admin/recipe.hook";
import { Recipe } from "@/types/recipe";
const recipeSchema = z.object({
  title: z.string().min(5).max(120),
  summary: z.string().min(5).max(120),
  contentHTML: z.string(),
  isPublished: z.boolean(),
  sharableLink: z.string().url(),
  slug: z.string(),
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

export default function UpdateRecipeForm({ recipe }: { recipe: Recipe }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: recipe.title,
      summary: recipe.summary,
      contentHTML: recipe.contentHTML,
      sharableLink: recipe.sharableLink,
      isPublished: recipe.isPublished,
      assets: recipe.assets,
      slug: recipe.slug,
    },
  });

  const { mutateAsync, isPending } = useUpdateRecipe();
  const onSubmit = async (values: FormValues) => {
    await mutateAsync({
      publicId: recipe.publicId,
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
          <h2 className="font-semibold text-lg">Update Recipe</h2>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="animate-spin duration-200" />
            ) : (
              "Update Recipe"
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
          name="slug"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Slug for the recipe..."
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
