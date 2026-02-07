import Images from "@/components/user/products/images";
import Hero from "@/components/user/products/hero";
import Similar from "@/components/user/products/similar";
import { ProductProvider } from "@/provider/product.provider";
import ProductBreadcrumb from "@/components/user/products/breadcrumb";
import { getProduct } from "@/actions/user/products/get.action";
import { notFound } from "next/navigation";
export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const res = await getProduct({
    slug: slug.toString(),
  });
  if (!res || !res.product) return notFound();
  return (
    <>
      <ProductProvider product={res.product}>
        <ProductBreadcrumb product={res.product}></ProductBreadcrumb>
        <section className="flex gap-12 items-start justify-center  flex-col lg:flex-row ">
          <Images product={res.product}></Images>
          <Hero product={res.product}></Hero>
        </section>
        <Similar></Similar>
      </ProductProvider>
    </>
  );
}
