"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductListingStore } from "@/store/user/products.store";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Search from "./search";
import { SortSelect } from "./sortSelect";
export function GridHeader() {
  const { data, isLoading, isFetching } = useProductListingStore();
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sortBy") || "all";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    params.set("page", "1"); // reset pagination on sort change

    router.push(`?${params.toString()}`);
  };

  if (!data || isFetching || isLoading) {
    return (
      <div className="flex items-start sm:items-center gap-4 justify-between mb-6 sm:flex-row flex-col">
        <h1 className="text-xl font-semibold capitalize">
          {slug ? slug.toString().replaceAll("-", " ") : "All Products"}
        </h1>

        <div className="flex w-full sm:w-fit gap-5 sm:gap-2 items-cener sm:flex-row flex-col">
          <Search></Search>
          <div className="flex gap-2 items-center sm:w-fit w-full">
            <h4 className="text-muted-foreground text-sm text-nowrap">
              Sort By:
            </h4>

            <SortSelect
              value={currentSort}
              onChange={handleSortChange}
              disabled={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start sm:items-center gap-4 justify-between mb-6 sm:flex-row flex-col">
      <h1 className="text-xl font-semibold capitalize">
        {slug ? slug.toString().replaceAll("-", " ") : "All Products"}
        <span className="text-sm text-muted-foreground">
          {" "}
          ({data.total} Products)
        </span>
      </h1>
      <div className="flex w-full sm:w-fit gap-5 sm:gap-2 items-cener sm:flex-row flex-col">
        <Search></Search>
        <div className="flex gap-2 items-center sm:w-fit w-full">
          <h4 className="text-muted-foreground text-sm text-nowrap">
            Sort By:
          </h4>

          <SortSelect
            value={currentSort}
            onChange={handleSortChange}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}
