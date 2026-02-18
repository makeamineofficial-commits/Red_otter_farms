import { validateUser } from "@/actions/auth/user.action";
import axios from "axios";
import { db } from "@/lib/db";
import { ProductPreview } from "@/types/product";
export async function getOrders() {
  try {
    const user = await validateUser();

    if (!user)
      return {
        success: false,
        message: "Failed to authenticate user",
      };
    const { customerId } = user;

    const res = await axios.get(
      "https://automation.redotterfarms.com/webhook/0b38de6f-5560-123-8204-a1874e419a2f",
      {
        params: {
          customer_id: customerId,
        },
        headers: {
          api_key: process.env.BACKEND_API_KEY as string,
        },
      },
    );

    if (!res.data || !Array.isArray(res.data)) {
      return {
        success: true,
        message: "User order history",
        orders: [],
      };
    }
    const orderList: SalesOrder[] = res.data;

    const skus = orderList
      .map((ele) => ele.line_items.map((ele) => ele.sku))
      .flat();

    const products = await db.variant.findMany({
      where: {
        sku: { in: skus },
      },
      select: {
        sku: true,
        mrp: true,
        publicId: true,
        price: true,
        inStock: true,
        stockLimit: true,
        options: {
          select: { value: { select: { displayName: true } } },
        },
        availableInStock: true,
        product: {
          select: {
            id: true,
            summary: true,
            type: true,
            publicId: true,
            displayName: true,
            nutritionalInfo: true,
            hasSubscription: true,
            slug: true,
            healthBenefits: true,
            assets: {
              where: { isPrimary: true },
              take: 1,
              select: {
                url: true,
                thumbnail: true,
                type: true,
                position: true,
                isPrimary: true,
              },
            },
          },
        },
      },
    });

    const productMap: Map<string, ProductPreview> = new Map();

    for (let { product, options, ...details } of products) {
      const formatedProduct: ProductPreview = {
        ...product,
        ...details,
        hasSubscription: product.hasSubscription,
        variantOption: options.map((ele) => ele.value.displayName),
        summary: product.summary ?? "",
        variantId: details.publicId,
        presentInWishlist: false,
        productId: product.publicId,
        variants: 1,
      };
      productMap.set(details.sku, formatedProduct);
    }

    const orders: (SalesOrder & { products: ProductPreview[] })[] =
      orderList.map((order) => {
        return {
          ...order,
          products: order.line_items.map(
            (ele) => productMap.get(ele.sku) as ProductPreview,
          ),
        };
      });

    return {
      success: true,
      message: "User order history",
      orders,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to get order history",
    };
  }
}
