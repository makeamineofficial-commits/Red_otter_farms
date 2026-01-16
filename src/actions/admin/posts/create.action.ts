"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";
import { PostProps } from "@/types/post";
import { generateSlug } from "@/lib/utils";
export const createPost = async (post: PostProps) => {
  await validateAdmin();

  try {
    const slug = generateSlug("post", post.title);

    const check = await db.post.findFirst({
      where: {
        OR: [{ slug }],
      },
    });

    if (check)
      return {
        success: false,
        message: "Post with this slug already exist",
      };
    const newPost = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const { assets, ...rest } = post;
        const newPost = await tx.post.create({
          data: { slug, ...rest },
        });

        await tx.postAsset.createMany({
          data: assets.map((ele) => {
            return {
              postId: newPost.id,
              ...ele,
            };
          }),
        });

        return newPost;
      }
    );

    return {
      success: true,
      message: "New post added to store",
      Blog: newPost,
    };
  } catch (err) {
    return { success: false, message: "Failed to create new post" };
  }
};
