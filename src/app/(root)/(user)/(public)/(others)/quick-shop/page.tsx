import quickShop from "@/actions/user/products/quickshop.action";
import QuickShopCard from "@/components/user/quick-shop/card";
export default async function page() {
  const categpries = await quickShop();
  return (
    <section className="flex flex-col gap-4 px-4 md:px-12 lg:px-18 pb-5 max-w-400 w-full m-auto space-y-10 mt-5">
      <div className="flex items-start sm:items-center gap-4 justify-between mb-6 sm:flex-row flex-col">
        <h1 className="text-2xl font-bold text-center mx-auto uppercase">
          Quick Shop
        </h1>
      </div>
      <div className="">
        {categpries.map((ele) => (
          <QuickShopCard key={ele.slug} {...ele} />
        ))}
      </div>
    </section>
  );
}
