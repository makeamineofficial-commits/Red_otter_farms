import { ProductPreview } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ProductCard({ product }: { product: ProductPreview }) {
  return (
    <div className="w-full flex items-center justify-between gap-4 bg-muted/20 rounded-lg px-4 py-3">
      <div className="flex gap-4 items-center">
        <div className="h-16 w-16 rounded-lg bg-muted relative overflow-hidden shrink-0">
          <Image
            fill
            src={product.assets[0]?.url}
            alt={product.displayName}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-md font-medium line-clamp-1">
            {product.displayName}
          </p>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.summary}
          </p>
        </div>
      </div>
      <Link href={"/products/" + product.slug}>
        <Button
          variant="outline"
          className="border-maroon text-maroon  hover:bg-transparent! hover:text-maroon shrink-0"
        >
          View More
        </Button>
      </Link>
    </div>
  );
}

export function WishlistCard({ product }: { product: ProductPreview }) {
  return <ProductCard product={product} />;
}

export function WishlistCardSkeleton() {
  return (
    <div className="w-full bg-muted/20 rounded-lg px-4 py-3 animate-pulse">
      <div className="flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex gap-4 items-center">
          {/* Image */}
          <div className="h-16 w-16 rounded-lg bg-muted" />

          {/* Text */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-36 bg-muted rounded" />
            <div className="h-3 w-52 bg-muted rounded" />
            <div className="h-3 w-24 bg-muted rounded" />
          </div>
        </div>

        {/* Button */}
        <div className="h-9 w-24 bg-muted rounded-md" />
      </div>
    </div>
  );
}
