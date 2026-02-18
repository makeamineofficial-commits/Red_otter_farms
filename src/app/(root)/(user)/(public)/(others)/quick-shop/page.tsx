import quickShop from "@/actions/user/products/quickshop.action";
import QuickShopCard from "@/components/user/quick-shop/card";
export default async function page() {
  const categpries = await quickShop();
  return (
    <section className="flex flex-col gap-4  w-full m-auto space-y-10">
      <div className="bg-forest text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-dream-orphans text-6xl md:text-7xl tracking-[4px] mb-4">
            Quick Shop
          </h1>
          <p className=" text-[#edefea] text-lg max-w-2xl mx-auto">
            Browse by category and add fresh, handpicked farm products to your
            cart instantly for a seamless shopping experience.
          </p>
        </div>
      </div>

      <div className="px-4 md:px-12 lg:px-18 pb-5 space-y-4">
        {categpries.map((ele) => (
          <QuickShopCard key={ele.slug} {...ele} />
        ))}
      </div>
    </section>
  );
}
