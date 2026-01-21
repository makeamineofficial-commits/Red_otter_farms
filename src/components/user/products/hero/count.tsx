"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
export default function Count() {
  const [quantity, setQuantity] = useState(0);
  return (
    <div className="gap-2.5 flex items-center">
      <div className="h-10  w-10 rounded-full border-2 flex items-center justify-center border-muted-foreground">
        <Minus
          className="size-5 cursor-pointer"
          onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
        />{" "}
      </div>

      <span className=" bg-[#E5E5E5]  rounded-md h-10 w-12 items-center justify-center flex leading-0 text-[1rem] sm:text-[1.125rem] font-semibold flex-1 text-center">
        {quantity}
      </span>
      <div className="h-10 w-10 rounded-full border-2  flex items-center justify-center border-muted-foreground">
        <Plus
          className="size-5 cursor-pointer"
          onClick={() => setQuantity((quantity) => quantity + 1)}
        ></Plus>
      </div>
    </div>
  );
}
