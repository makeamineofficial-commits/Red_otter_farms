"use server";
import { db } from "@/lib/db";
import { Prisma } from "../../../../generated/prisma/browser";
import { validateAdmin } from "../../auth/admin.action";

interface ArchivePostProps {
  publicId: string;
}
export const archivePost = async (Post: ArchivePostProps) => {
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
    const updatedPost = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const updatedPost = await tx.post.update({
          data: { isPublished: !check.isPublished },
          where: { id: check.id },
        });

        return updatedPost;
      }
    );

    return {
      success: true,
      message: check.isPublished ? "Post archived" : "Post published",
      post: updatedPost,
    };
  } catch (err) {
    return { success: false, message: "Failed to change post status" };
  }
};
