export function ProductCardLoader() {
  return (
    <div className="rounded-2xl w-full border p-3 space-y-3">
      {/* Image */}
      <div className="relative aspect-square rounded-xl bg-muted" />

      {/* Title + Price */}
      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-4 w-1/2 bg-muted rounded" />
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-5 w-14 rounded-full bg-muted" />
        ))}
      </div>

      {/* Quantity + Button */}
      <div className="flex items-center justify-between gap-2">
        {/* Counter */}
        <div className="flex items-center border rounded-lg overflow-hidden">
          <div className="h-8 w-8 bg-muted" />
          <div className="h-8 w-8 bg-muted" />
          <div className="h-8 w-8 bg-muted" />
        </div>

        {/* Add Button */}
        <div className="h-8 w-24 bg-muted rounded-lg" />
      </div>
    </div>
  );
}
