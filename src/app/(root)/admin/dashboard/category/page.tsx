import { Search } from "@/components/common/search";
import CreateCategory from "@/components/admin/category/create";
import { CategoryTable } from "@/components/admin/category/table";
export default function page() {
  return (
    <>
      <h2 className="font-semibold">Categories</h2>
      <div className="flex items-center justify-between">
        <Search></Search>
        <CreateCategory></CreateCategory>
      </div>
      <CategoryTable></CategoryTable>
    </>
  );
}
