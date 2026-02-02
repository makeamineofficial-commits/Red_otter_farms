"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AddressCardLoader() {
  return (
    <div className="w-full h-auto p-4 border rounded-2xl relative animate-pulse opacity-50">
      <div className="space-y-2 text-sm mt-4  ">
        <p className="font-semibold">John Doe</p>
        <div>
          <p className="text-muted-foreground">
            D-**/** J**** Flats, Sec **, Noida
          </p>
          <p className="text-muted-foreground">NOIDA, UTTAR PRADESH 201301</p>
          <p className="text-muted-foreground">India</p>
        </div>

        <p className="">
          Phone number:{" "}
          <span className="text-muted-foreground">9650******</span>
        </p>
      </div>

      <div className="ml-auto w-fit mt-4 gap-1 flex justify-end">
        <Badge variant={"outline"} className="">
          Home
        </Badge>
        <Badge variant={"outline"} className="">
          Work
        </Badge>
      </div>

      <div className="flex gap-2 absolute top-4 right-4">
        <button>
          <Pencil size={15} className="stroke-1 "></Pencil>
        </button>

        <button>
          <Trash2 size={15} className="stroke-1 text-red-500"></Trash2>
        </button>
      </div>
    </div>
  );
}
