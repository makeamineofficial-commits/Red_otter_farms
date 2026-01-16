import React from "react";
import { Search } from "@/components/common/search";
import CreateCollection from "@/components/admin/collection/create";
import { CollectionTable } from "@/components/admin/collection/table";
export default function page() {
  return (
    <>
      <h2 className="font-semibold">Collections</h2>
      <div className="flex items-center justify-between">
        <Search></Search>
        <CreateCollection></CreateCollection>
      </div>
      <CollectionTable></CollectionTable>
    </>
  );
}
