import React from "react";
import CreatePost from "@/components/admin/post/create";
import { Search } from "@/components/common/search";
import { PostTable } from "@/components/admin/post/table";
export default function page() {
  return (
    <>
      <h2 className="font-semibold">Post</h2>
      <div className="flex items-center justify-between">
        <Search></Search>
        <CreatePost></CreatePost>
      </div>
      <PostTable></PostTable>
    </>
  );
}
