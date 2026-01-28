import Hero from "./hero";
import Testimonial from "./testimonial";

export default function Testimony() {
  return (
    <section className="px-4 md:px-12 lg:px-18 py-10 sm:py-16 lg:py-24 bg-herbal overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center relative gap-16">
        <Hero />

        <div className="absolute  top-0 -right-100 2xl:-right-60 hidden md:block">
          <Testimonial />
        </div>

        <div className=" block md:hidden">
          <Testimonial />
        </div>
      </div>
    </section>
  );
}
