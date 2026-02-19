"use client";

import { SearchIcon } from "lucide-react";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";

function _Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const action = searchParams.get("action");

  const [value, setValue] = useState(searchParams.get("q") ?? "");

  const [debouncedValue] = useDebounce(value, 300);

  useEffect(() => {
    if (action === "search") {
      inputRef.current?.focus();
    }
  }, [action]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedValue.trim()) {
      params.set("q", debouncedValue.trim());
      router.replace(`/recipes?${params.toString()}`, {
        scroll: false,
      });
    } else {
      router.replace(pathname, { scroll: false });
    }
  }, [debouncedValue]);

  return (
    <div className="flex items-center gap-2">
      <SearchIcon className="text-muted-foreground" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="
          border-b border-muted-foreground
          focus:outline-none
          focus:ring-0
          focus:border-muted-foreground
          bg-transparent
          w-full
          text-sm pb-1 pl-2
        "
      />
    </div>
  );
}

export default function Search() {
  return (
    <Suspense fallback={<></>}>
      <_Search />
    </Suspense>
  );
}
