"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { Post, PostProps } from "@/types/post";

export interface UpdatePostProps extends PostProps {
  publicId: string;
}

export const updatePost = async (post: UpdatePostProps) => {
  await validateAdmin();
  const { publicId } = post;
  try {
    const check = await db.post.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Post with this publicId doesn't exist",
      };
    const updatedPost = await db.$transaction(
      async (tx: Prisma.TransactionClient): Promise<Post> => {
        const { assets, publicId, ...rest } = post;
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
