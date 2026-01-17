"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { Post, PostProps } from "@/types/post";

export interface UpdatePostProps extends PostProps {
  publicId: string;
  slug: string;
}

export const updatePost = async (post: UpdatePostProps) => {
  await validateAdmin();
  const { publicId, sharableLink, slug } = post;
  try {
    const check = await db.post.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Post doesn't exist",
      };

    const exist = await db.post.findFirst({
      where: {
        OR: [{ sharableLink }, { slug }],
      },
    });

    if (exist && exist.id !== check.id)
      return {
        success: false,
        message: "Shared link or slug already in use",
      };

    const updatedPost = await db.$transaction(
      async (tx: Prisma.TransactionClient): Promise<Post> => {
        const { assets, publicId, ...rest } = post;
        const updatedPost = await tx.post.update({
          data: { ...rest },
          where: { id: check.id },
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
        await tx.postAsset.deleteMany({
          where: {
            postId: updatedPost.id,
          },
        });
        await tx.postAsset.createMany({
          data: assets.map((ele) => {
            return {
              postId: updatedPost.id,
              ...ele,
            };
          }),
        });
        // @ts-ignore
        return updatedPost;
      },
    );

    return {
      success: true,
      message: "Post updated",
      post: updatedPost,
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to update post" };
  }
};
