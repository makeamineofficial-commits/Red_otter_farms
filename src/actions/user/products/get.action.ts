"use server";

import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { nullToUndefined } from "@/lib/utils";
import { Product, Variant } from "@/types/product";
import { validateUser, validateUserReadOnly } from "@/actions/auth/user.action";
import { isLocationNCR } from "../location/index.action";
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
  isNCR: boolean,
): Promise<
  | (Product & {
      id: string;
      recipes: { title: string; slug: string }[];
      variants: Variant[];
    })
  | null
> => {
  const locationFilter = isNCR ? {} : { isDryStore: true };
  const product = await db.product.findUnique({
    where: { slug, ...locationFilter },
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
    categories: product.categories.map((c) => {
      const { id, ...details } = c.category;
      return details;
    }),
    variants: product.variants.map(({ id, listedIngredients, ...ele }) => {
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
  async ({ slug, isNCR }: { slug: string; isNCR: boolean }) => {
    return _getProductCached(slug, isNCR);
  },
  // @ts-ignore
  (args) => [`product:${args.slug}:ncr:${args.isNCR}`], // include NCR in key
  {
    revalidate: 60,
    tags: ["product"],
  },
);

/* -------------------- Public API -------------------- */

export const getProduct = async ({ slug }: { slug: string }) => {
  const isNCRLocation = await isLocationNCR();

  const product = await getCachedProduct({ slug, isNCR: isNCRLocation });

  if (!product) {
    return { success: false, message: "Product not found" };
  }

  const { id, ...detail } = product;
  const user = await validateUserReadOnly();

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
