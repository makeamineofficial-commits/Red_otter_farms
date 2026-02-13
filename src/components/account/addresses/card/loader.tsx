"use client";

export default function AddressCardLoader() {
  return (
    <div className="w-full p-4 border rounded-2xl relative animate-pulse">
      <div className="h-4 w-32 bg-muted rounded mb-3" />

      <div className="space-y-2 mt-2">
        <div className="h-3 w-full bg-muted rounded" />
        <div className="h-3 w-5/6 bg-muted rounded" />
        <div className="h-3 w-1/3 bg-muted rounded" />
      </div>

      <div className="h-3 w-48 bg-muted rounded mt-4" />

      <div className="flex gap-2 justify-end mt-4">
        <div className="h-5 w-14 bg-muted rounded-full" />
        <div className="h-5 w-14 bg-muted rounded-full" />
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <div className="h-4 w-4 bg-muted rounded" />
        <div className="h-4 w-4 bg-muted rounded" />
      </div>
    </div>
  );
}
