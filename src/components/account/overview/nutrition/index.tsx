import { Droplets, Drumstick, Sparkles, Wheat, Zap } from "lucide-react";

export default function Nutrition() {
  return (
    <div className="border p-4 rounded-2xl w-full relative">
      <div className="flex items-center gap-2 text-[1.075rem] font-semibold">
        <Sparkles className="text-maroon" size={20}></Sparkles>
        <h2>Nutrition Meter</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-4">
        <div className="flex flex-col gap-4 py-2 xl:py-5 ">
          <div className="flex gap-2 items-center justify-center w-fit">
            <div className="bg-[#FEF3C7] aspect-square h-10 rounded-md flex items-center justify-center">
              <Zap className="text-[#D97706]" size={18}></Zap>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Energy</span>
              <p className="text-muted-foreground">
                <strong className="text-black">1850 </strong>
                kcal
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-muted w-full h-2 relative  rounded-2xl">
              <div className="bg-maroon h-full w-[65%]  rounded-2xl top-1/2 -translate-y-1/2 left-0"></div>
            </div>
            <span className="text-xs leading-0 text-muted-foreground  text-right w-full">
              65% of daily goal
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-2 xl:py-5 ">
          <div className="flex gap-2 items-center justify-center w-fit">
            <div className="aspect-square h-10 rounded-md flex items-center justify-center">
              <Wheat size={18} />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Carbs</span>
              <p className="text-muted-foreground">
                <strong className="text-black">256 </strong>g
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-muted w-full h-2 relative  rounded-2xl">
              <div className="bg-maroon h-full w-[65%]  rounded-2xl top-1/2 -translate-y-1/2 left-0"></div>
            </div>
            <span className="text-xs leading-0 text-muted-foreground  text-right w-full">
              65% of daily goal
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-2 xl:py-5 ">
          <div className="flex gap-2 items-center justify-center w-fit">
            <div className=" aspect-square h-10 rounded-md flex items-center justify-center">
              <Drumstick size={18} />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Protien</span>
              <p className="text-muted-foreground">
                <strong className="text-black">68 </strong>g
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-muted w-full h-2 relative  rounded-2xl">
              <div className="bg-maroon h-full w-[65%]  rounded-2xl top-1/2 -translate-y-1/2 left-0"></div>
            </div>
            <span className="text-xs leading-0 text-muted-foreground  text-right w-full">
              65% of daily goal
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-2 xl:py-5 ">
          <div className="flex gap-2 items-center justify-center w-fit">
            <div className="bg-maroon/10 aspect-square h-10 rounded-md flex items-center justify-center">
              <Droplets className="text-maroon" size={18} />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Fat</span>
              <p className="text-muted-foreground">
                <strong className="text-black">58 </strong>g
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-muted w-full h-2 relative  rounded-2xl">
              <div className="bg-maroon h-full w-[65%]  rounded-2xl top-1/2 -translate-y-1/2 left-0"></div>
            </div>
            <span className="text-xs leading-0 text-muted-foreground  text-right w-full">
              65% of daily goal
            </span>
          </div>
        </div>
      </div>

      {/*
      <div>
        <h2 className="text-[1.25rem] font-bold">Free Delivery Active</h2>
        <p className="text-[0.875rem] text-muted-foreground">
          Unlimited free delivery on your orders for the month.
        </p>
      </div>

      <Button variant={"outline"} className="rounded-md mt-4">
        View Pass Benefits
        <ArrowRight></ArrowRight>
      </Button>

      <Truck size={25} className="absolute top-4 right-4"></Truck> */}
    </div>
  );
}
