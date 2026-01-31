import { validateUser } from "@/actions/auth/user.action";
import { db } from "@/lib/db";

export const getWishlist = async () => {
  const user = await validateUser();

  if (!user || !user.phone)
    return {
      success: false,
      message: "Login required to update wishlist",
    };

  const { phone } = user;

  const products = await db.userWishlist.findMany({
    where: {
      phone,
    },
    select: {
      product: {
        include: {
          assets: true,
        },
      },
    },
  });

  return { success: true, products, message: "Wishlist of user" };
};
