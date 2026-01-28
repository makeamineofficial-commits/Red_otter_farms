import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Minus, Plus } from "lucide-react";
import { Product } from "@/types/product";

export function ProductCardLoader() {
  return (
    <div className="rounded-2xl w-full border p-3 space-y-3 animate-pulse duration-300 transition-all">
      <div className="relative aspect-square rounded-xl bg-muted flex items-end justify-end p-2"></div>
      {/* <Button variant={"outline"}>
        <ExternalLink></ExternalLink>
      </Button> */}
      <div className="space-y-1">
        <p className="text-sm font-medium">Product Name</p>
        <p className="text-sm font-semibold">
          ₹29.00{" "}
          <span className="text-xs text-muted-foreground line-through">
            ₹39.00
          </span>
        </p>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        <Badge variant="outline" className="text-xs">
          Original
        </Badge>
        <Badge variant="outline" className="text-xs">
          Fresh
        </Badge>
        <Badge variant="outline" className="text-xs">
          Quality Check
        </Badge>
      </div>

      {/* Quantity + Add to Cart */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center border rounded-lg">
          <Button size="icon" variant="ghost" disabled>
            <Minus className="size-4" />
          </Button>
          <span className="px-2 text-sm">1</span>
          <Button size="icon" variant="ghost" disabled>
            <Plus className="size-4" />
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            className="rounded-lg bg-maroon! hover:bg-maroon/90"
          >
            Add to Cart
          </Button>

          <Button variant={"outline"}>
            <ExternalLink className="text-maroon"></ExternalLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
