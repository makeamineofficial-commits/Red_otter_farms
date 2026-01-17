"use server";
import { db } from "@/lib/db";
import { Post } from "@/types/post";
import { AssetType } from "@/types/common";
import { nullToUndefined } from "@/lib/utils";
import { validateAdmin } from "@/actions/auth/admin.action";

export const getPost = async ({
  publicId,
}: {
  publicId: string;
}): Promise<{ post?: Post; success: boolean; message: string }> => {
  await validateAdmin();

  const product = await db.post.findUnique({
    where: {
      publicId,
    },
    include: {
      assets: {
        select: {
          url: true,
          thumbnail: true,
          type: true,
        },
      },
    },
  });
  if (!product) return { success: false, message: "Post details not found" };
  const data = nullToUndefined({
    ...product,

    description: product.contentHTML ?? undefined,
    assets: product.assets.map((ele) => {
      return { ...ele, type: ele.type as AssetType };
    }),
  });

  return {
    post: data,
    success: true,
    message: "Post details found",
  };
};
