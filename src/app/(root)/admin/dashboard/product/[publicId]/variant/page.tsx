import { Search } from "@/components/common/search";
import CreateVariant from "@/components/admin/variant/create";
import { VariantTable } from "@/components/admin/variant/table";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <div className="flex items-center justify-start gap-1">
        <Link href={`/admin/dashboard/product`}>
          <ChevronLeft />
        </Link>
        <h2 className="font-semibold">Variants</h2>
      </div>

      <div className="flex items-center justify-between">
        <Search />
        <CreateVariant />
      </div>

      <VariantTable />
    </>
  );
}
