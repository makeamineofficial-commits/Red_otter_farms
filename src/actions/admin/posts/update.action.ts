"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { Post, PostProps } from "@/types/post";

export interface UpdatePostProps extends PostProps {
  slug: string;
}

export const updatePost = async (post: UpdatePostProps) => {
  await validateAdmin();
  const { slug } = post;
  try {
    const check = await db.post.findFirst({
      where: {
        AND: [{ slug }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Post with this slug doesn't exist",
      };
    const updatedPost = await db.$transaction(
      async (tx: Prisma.TransactionClient): Promise<Post> => {
        const { assets, slug, ...rest } = post;
        const newPost = await tx.post.update({
          data: { ...rest },
          where: { id: check.id },
        });

        await tx.postAsset.createMany({
          data: assets.map((ele) => {
            return {
              postId: newPost.id,
              ...ele,
            };
          }),
        });

        return updatedPost;
      }
    );

    return {
      success: true,
      message: "Post updated",
      post: updatedPost,
    };
  } catch (err) {
    return { success: false, message: "Failed to update post" };
  }
};
