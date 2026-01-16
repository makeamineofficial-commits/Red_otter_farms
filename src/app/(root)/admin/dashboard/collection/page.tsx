import React from "react";
import { Search } from "@/components/common/search";
import CreateCollection from "@/components/admin/collection/create";
import { CollectionTable } from "@/components/admin/collection/table";
export default function page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Search></Search>
        <CreateCollection></CreateCollection>
      </div>
      <CollectionTable></CollectionTable>
    </>
  );
}
