import { getOrder } from "@/actions/user/orders/get.action";

import OrderHeader from "@/components/user/orders/header";
import OrderItems from "@/components/user/orders/items";
import OrderAddresses from "@/components/user/orders/address";
import OrderSummary from "@/components/user/orders/summary";
import OrderContact from "@/components/user/orders/contact";
import { Premium } from "@/components/user/orders/premium";
import { RecommendedProducts } from "@/components/user/orders/recommendation";
import { ContinueShopping } from "@/components/user/orders/continueShopping";
import { listFeaturedProducts } from "@/actions/user/products/featured.action";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: PageProps) {
  const { id } = await params;

  const featuredProducts = await listFeaturedProducts();
  const data = await getOrder({
    orderId: id,
  });

  if (!data.success || !data.order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Order not found</h2>
      </div>
    );
  }

  const {
    billing,
    shipping,
    products,
    subTotal,
    total,
    discount,

    shippingFee,
  } = data.order;
  return (
    <div className="bg-white">
      <OrderHeader />

      <div className="px-4 md:px-12 lg:px-18 pb-5 mt-20">
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-12">
            <OrderItems products={products} />

            <OrderAddresses shipping={shipping} billing={billing} />

            <OrderContact shipping={shipping} />
          </div>

          <OrderSummary
            subTotal={subTotal / 100}
            discount={discount / 100}
            shipping={shippingFee / 100}
            total={total / 100}
          />
        </div>

        <Premium surveySubmitted={data.surveySubmitted} />

        <RecommendedProducts products={featuredProducts} />

        <ContinueShopping />
      </div>
    </div>
  );
}
