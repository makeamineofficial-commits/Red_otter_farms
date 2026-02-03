import { Search } from "@/components/common/search";
import CreateTestimonial from "@/components/admin/testimonial/create";
import { TestimonialTable } from "@/components/admin/testimonial/table";
export default function page() {
  return (
    <>
      <h2 className="font-semibold">Testimonials</h2>
      <div className="flex items-center justify-between">
        <Search></Search>
        <CreateTestimonial></CreateTestimonial>
      </div>
      <TestimonialTable></TestimonialTable>
    </>
  );
}
