"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GridHeader() {
  return (
    <div className="flex items-start sm:items-center gap-4  justify-between mb-6 sm:flex-row flex-col  ">
      <h1 className="text-xl font-semibold">
        All Products{" "}
        <span className="text-sm text-muted-foreground ">(52 Products)</span>
      </h1>

      <div className="flex gap-2 items-center sm:w-fit w-full">
        <h4 className="text-muted-foreground text-sm text-nowrap"> Sort By:</h4>
        <Select defaultValue="best-selling">
          <SelectTrigger className="sm:w-44 w-full ">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="best-selling">Best Selling</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
