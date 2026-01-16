"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

function SearchComponent({ children }: { children?: ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentSearch = searchParams.get("q") || "";
  const [value, setValue] = useState(currentSearch);
  const [debouncedValue] = useDebounce(value, 500);

  const limit = searchParams.get("limit") || 10;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedValue) {
      params.set("q", debouncedValue);
    } else {
      params.delete("q");
    }

    router.replace(`?${params.toString()}`);
  }, [debouncedValue]);

  useEffect(() => {
    if (currentSearch !== value) {
      setValue(currentSearch);
    }
  }, [currentSearch]);
  const handleLimitChage = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", String(val));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-sm flex gap-2 items-center">
      <Input
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full"
      />
      <Select
        defaultValue={limit.toString() ?? "10"}
        onValueChange={(v) => handleLimitChage(v)}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10 / Page</SelectItem>
          <SelectItem value="20">20 / Page</SelectItem>
          <SelectItem value="30">30 / Page</SelectItem>
          <SelectItem value="40">40 / Page</SelectItem>
          <SelectItem value="50">50 / Page</SelectItem>
        </SelectContent>
      </Select>
      {children}
    </div>
  );
}

export function Search() {
  return (
    <>
      <Suspense fallback={<>Loading ...</>}>
        <SearchComponent />
      </Suspense>
    </>
  );
}
