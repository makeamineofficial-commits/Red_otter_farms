import { Search } from "@/components/common/search";
import CreateVariant from "@/components/admin/variant/create";
import { VariantTable } from "@/components/admin/variant/table";
export default function page() {
  return (
    <>
      <h2 className="font-semibold">Variants</h2>
      <div className="flex items-center justify-between">
        <Search></Search>
        <CreateVariant></CreateVariant>
      </div>
      <VariantTable></VariantTable>
    </>
  );
}
