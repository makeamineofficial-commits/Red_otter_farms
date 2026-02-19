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
import { ChevronLeft, Loader2 } from "lucide-react";
import FileUpload from "@/components/common/fileUpload";
import { AssetType } from "@/types/common";
import { useUpdateRecipe } from "@/hooks/admin/recipe.hook";
import { Recipe } from "@/types/recipe";
import { KeyValueArrayField } from "@/components/common/keyValueArrayField";
import { ArrayField } from "@/components/common/arrayField";
import { ProductMultiSelect } from "@/components/common/productMultiSelect";
import { useAdminStore } from "@/store/admin/admin.store";
import { useEffect } from "react";
import { TagInput } from "@/components/common/tagInput";
import Link from "next/link";
export const recipeSchema = z.object({
  title: z.string().trim().min(5).max(120),
  summary: z.string().trim().min(5).max(120),
  isPublished: z.boolean(),
  slug: z.string(),
  listedIngredients: z.array(
    z.object({
      quantity: z.number().min(1),
      publicId: z.string(),
    }),
  ),
  cookingTime: z.string(),
  difficulty: z.string(),
  serving: z.string(),
  prepTime: z.string(),
  tags: z.array(z.string().min(1)) ?? [],
  instructions: z.array(z.string().min(1)),
  ingredients: z.array(z.string().min(1)),
  chefTips: z.array(z.string().min(1)),
  nutritionalInfo: z.unknown(),
  healthBenefits: z.array(z.string().min(1)),
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
  const { data, isLoading } = useAdminStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: recipe.title,
      summary: recipe.summary,
      listedIngredients: recipe.listedIngredients.map((ele) => {
        return {
          quantity: ele.quantity,
          publicId: ele.variant.publicId,
        };
      }),
      instructions: recipe.instructions,
      chefTips: recipe.chefTips,
      ingredients: recipe.ingredients,
      nutritionalInfo: recipe.nutritionalInfo,
      isPublished: recipe.isPublished,
      assets: recipe.assets,
      slug: recipe.slug,
      tags: recipe.tags,
      healthBenefits: recipe.healthBenefits,
      cookingTime: recipe.cookingTime,
      difficulty: recipe.difficulty,
      serving: recipe.serving,
      prepTime: recipe.prepTime,
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
          <div className="flex items-center justify-start gap-1">
            <Link href="/admin/dashboard/recipe">
              <ChevronLeft></ChevronLeft>
            </Link>
            <h2 className="font-semibold text-lg">Update Recipe</h2>
          </div>
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
          name="tags"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput placeholder="Tags for the recipe..." {...field} />
              </FormControl>{" "}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="cookingTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cooking Time</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Cooking time for the recipe..."
                    {...field}
                  />
                </FormControl>{" "}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prepTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Preparation Time</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Preparation time for the recipe..."
                    {...field}
                  />
                </FormControl>{" "}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="serving"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Servings</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Servings for the recipe..."
                    {...field}
                  />
                </FormControl>{" "}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Difficulty</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Difficulty of the recipe..."
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
          name="listedIngredients"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Linked Products</FormLabel>
              <FormControl>
                <ProductMultiSelect
                  loading={isLoading}
                  options={
                    data?.variants.map((ele) => {
                      return {
                        label: ele.name,
                        value: ele.publicId,
                      };
                    }) ?? []
                  }
                  {...field}
                ></ProductMultiSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <ArrayField
                  value={field.value}
                  onChange={field.onChange}
                ></ArrayField>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <ArrayField
                  value={field.value}
                  onChange={field.onChange}
                ></ArrayField>
              </FormControl>{" "}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chefTips"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Chef's Tips</FormLabel>
              <FormControl>
                <ArrayField
                  value={field.value}
                  onChange={field.onChange}
                ></ArrayField>
              </FormControl>{" "}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nutritionalInfo"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nutritional Info</FormLabel>
              <FormControl>
                <KeyValueArrayField
                  value={field.value as Record<string, string>}
                  onChange={field.onChange}
                ></KeyValueArrayField>
              </FormControl>{" "}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="healthBenefits"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Health Benefits</FormLabel>
              <FormControl>
                <ArrayField
                  value={field.value}
                  onChange={field.onChange}
                ></ArrayField>
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
