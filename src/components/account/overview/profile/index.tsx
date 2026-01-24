import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserCircle } from "lucide-react";
export default function Progress() {
  return (
    <div className="flex gap-4 bg-maroon/10 p-5 justify-between rounded-lg border-maroon/30 border flex-col md:flex-row">
      <div className="flex items-center gap-2">
        <div className="bg-maroon/20 rounded-md min-h-9 min-w-9 flex items-center justify-center">
          <UserCircle
            size={25}
            className="text-maroon stroke-1 h-fit w-fit"
          ></UserCircle>
        </div>

        <div>
          <h1 className="font-medium ">Complete Your Profile</h1>
          <p className="text-[0.875rem] text-muted-foreground">
            Help us personalize your recommendations
          </p>
        </div>
      </div>

      <div className="flex gap-5 items-center justify-center">
        <div className="flex flex-col gap-1 w-full">
          <div className="relative h-2  w-full md:w-30 bg-muted  overflow-hidden rounded-lg">
            <div className="absolute w-[65%] bg-maroon h-full top-1/2 left-0 -translate-y-1/2 "></div>
          </div>
          <span className="text-xs text-muted-foreground">65% Complete</span>
        </div>
        <Button className="bg-maroon! hover:bg-marron! text-white!">
          Continue <ArrowRight></ArrowRight>
        </Button>
      </div>
    </div>
  );
}
