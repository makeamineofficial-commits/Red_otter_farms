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
import { useUpdateTestimonial } from "@/hooks/admin/testimonial.hook";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Testimonial } from "@/types/testimonial";
import FileUpload from "@/components/common/fileUpload";
import { AssetType } from "@/types/common";
import { numberField } from "@/lib/utils";
const testimonialSchema = z.object({
  review: z.string().min(5).max(120),
  rating: z.number().min(0).max(5),
  heroImage: z.array(
    z.object({
      url: z.string(),
      thumbnail: z.string(),
      position: z.number().int().nonnegative(),
      isPrimary: z.boolean(),
      type: z.nativeEnum(AssetType),
    }),
  ),
  name: z.string(),
  position: z.string(),
  avatar: z.array(
    z.object({
      url: z.string(),
      thumbnail: z.string(),
      position: z.number().int().nonnegative(),
      isPrimary: z.boolean(),
      type: z.nativeEnum(AssetType),
    }),
  ),
  isPublished: z.boolean(),
  slug: z.string(),
});

type FormValues = z.infer<typeof testimonialSchema>;

export default function UpdateTestimonialForm({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      review: testimonial.review,
      rating: testimonial.rating,
      name: testimonial.name,
      position: testimonial.position,
      slug: testimonial.slug,
      isPublished: testimonial.isPublished,
      heroImage: testimonial.heroImage ?? [],
      avatar: testimonial.avatar ?? [],
    },
  });

  const { mutateAsync, isPending } = useUpdateTestimonial();

  const onSubmit = async (values: FormValues) => {
    await mutateAsync({
      ...values,
      publicId: testimonial.publicId,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 overflow-hidden"
      >
        {/* Review */}
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write the testimonial review..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rating */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating (0–5)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.5"
                  min={0}
                  max={5}
                  {...numberField(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Customer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Position */}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position / Company</FormLabel>
              <FormControl>
                <Input placeholder="CEO, Founder, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="john-doe-testimonial" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hero Image */}
        <FormField
          control={form.control}
          name="heroImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero Image</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  limit={1}
                  onChange={(files) =>
                    field.onChange(
                      files.map((file, index) => ({
                        ...file,
                        position: index,
                        isPrimary: true,
                        type: file.type ?? AssetType.IMAGE,
                      })),
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Avatar */}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  limit={1}
                  onChange={(files) =>
                    field.onChange(
                      files.map((file, index) => ({
                        ...file,
                        position: index,
                        isPrimary: true,
                        type: file.type ?? AssetType.IMAGE,
                      })),
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Publish */}
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="mb-0">Published</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Update Testimonial"
          )}
        </Button>
      </form>
    </Form>
  );
}
