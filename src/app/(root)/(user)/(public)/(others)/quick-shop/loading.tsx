import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800" />

        {/* Text */}
        <p className="text-sm text-gray-600 font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
