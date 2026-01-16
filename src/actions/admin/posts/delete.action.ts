"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface DeletePostProps {
  publicId: string;
}
export const deletePost = async (Post: DeletePostProps) => {
  await validateAdmin();
  const { publicId } = Post;
  try {
    const check = await db.post.findFirst({
      where: {
        AND: [{ publicId }],
      },
    });

    if (!check)
      return {
        success: false,
        message: "Post details not found",
      };
    const deletedPost = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const deletedPost = await tx.post.update({
          data: { isDeleted: true },
          where: { id: check.id },
        });
        return deletedPost;
      }
    );

    return {
      success: true,
      message: "Post deleted",
      post: deletedPost,
    };
  } catch (err) {
    return { success: false, message: "Failed to delete post" };
  }
};
