import { ProductCard } from "../../../common/productCard/card";
import { GridHeader } from "./header";
export function Grid() {
  return (
    <div className="w-full">
      <GridHeader></GridHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-6">
        {Array.from({ length: 16 }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </div>
  );
}
