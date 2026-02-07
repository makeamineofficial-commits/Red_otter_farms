"use server";

import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { nullToUndefined } from "@/lib/utils";
import { Product, Variant } from "@/types/product";
import { validateUser } from "@/actions/auth/user.action";

/* -------------------- Helpers -------------------- */

function getUniqueRecipes(recipes: { title: string; slug: string }[]) {
  const seen = new Set<string>();
  const unique: { title: string; slug: string }[] = [];

  for (const r of recipes) {
    if (!seen.has(r.slug)) {
      seen.add(r.slug);
      unique.push(r);
    }
  }

  return unique;
}

/* -------------------- Main Cached Fetch -------------------- */

const _getProductCached = async (
  slug: string,
): Promise<
  | (Product & {
      id: string;
      recipes: { title: string; slug: string }[];
      variants: Variant[];
    })
  | null
> => {
  const product = await db.product.findUnique({
    where: { slug },
    include: {
      categories: { include: { category: true } },
      faqs: {
        select: {
          question: true,
          answer: true,
        },
      },
      assets: true,
      options: { include: { values: true } },
      variants: {
        where: {
          isPublished: true,
        },
        include: {
          options: {
            select: {
              value: { include: { option: { select: { slug: true } } } },
            },
          },
          listedIngredients: {
            select: { recipe: { select: { title: true, slug: true } } },
          },
        },
      },
    },
  });

  if (!product) return null;

  const recipes = getUniqueRecipes(
    product.variants.flatMap((ele) =>
      ele.listedIngredients.map((ele) => ele.recipe),
    ),
  );

  return nullToUndefined({
    ...product,
    nutritionalInfo: product.nutritionalInfo as any,
    summary: product.summary ?? "",
    description: product.description ?? "",
    categories: product.categories.map((c) => c.category),
    variants: product.variants.map((ele) => {
      return {
        ...ele,
        options: ele.options.map((ele) => {
          return { option: ele.value.option.slug, optionValue: ele.value.slug };
        }),
      };
    }),
    options: product.options.map((o) => ({
      displayName: o.displayName,
      slug: o.slug,
      values: o.values.map((v) => ({
        displayName: v.displayName,
        slug: v.slug,
        isDefault: v.isDefault,
      })),
    })),
    recipes,
    presentInWishlist: false,
  });
};

/* -------------------- Cached Wrapper -------------------- */

const getCachedProduct = unstable_cache(
  async ({ slug }: { slug: string }) => {
    return _getProductCached(slug);
  },
  // @ts-ignore
  (args) => [`product:${args.slug}`],
  {
    revalidate: 60,
    tags: ["product"],
  },
);

/* -------------------- Public API -------------------- */

export const getProduct = async ({ slug }: { slug: string }) => {
  const product = await getCachedProduct({ slug });

  if (!product) {
    return { success: false, message: "Product not found" };
  }

  const { id, ...detail } = product;
  const user = await validateUser();

  let presentInWishlist = false;
  if (user?.phone) {
    presentInWishlist = Boolean(
      await db.userWishlist.findUnique({
        where: { phone_productId: { phone: user.phone, productId: id } },
        select: { productId: true },
      }),
    );
  }

  return {
    success: true,
    message: "Product details found",
    product: {
      ...detail,
      presentInWishlist,
      nutritionalInfo: detail.nutritionalInfo as Record<string, number>,
    },
  };
};
