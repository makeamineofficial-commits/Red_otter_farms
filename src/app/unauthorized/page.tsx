// app/unauthorized/page.tsx
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold">401</h1>
      <p className="text-xl mt-4">
        You are not authorized to access this page.
      </p>
      <Link href="/" className="mt-6 text-blue-600 hover:underline">
        Go back home
      </Link>
    </div>
  );
}
