export default function Loading() {
  return (
    <div className="bg-white animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-[#004b1a] py-16 px-4">
        <div className=" mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-white/20 rounded-full mx-auto" />

          <div className="h-10 w-80 bg-white/20 mx-auto rounded" />

          <div className="h-4 w-96 bg-white/20 mx-auto rounded" />

          <div className="h-8 w-64 bg-white/20 mx-auto rounded-full" />
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto px-4 md:px-16 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-10">
            {/* Items */}
            <div className="border-2 border-[#004b1a] rounded-lg p-6 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-28 h-28 bg-gray-200 rounded-lg" />

                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                    <div className="h-3 w-1/3 bg-gray-200 rounded" />
                  </div>

                  <div className="w-20 h-5 bg-gray-200 rounded" />
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="border-2 border-[#004b1a] rounded-lg p-6 space-y-4"
                >
                  <div className="h-4 w-32 bg-gray-200 rounded" />

                  <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-5/6 bg-gray-200 rounded" />
                    <div className="h-3 w-2/3 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="border-2 border-[#004b1a] rounded-lg p-6 grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            <div className="border-2 border-[#004b1a] rounded-lg p-6 bg-[#edefea] space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              ))}

              <div className="h-10 w-full bg-gray-300 rounded mt-6" />
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border-2 border-[#004b1a] rounded-lg overflow-hidden"
            >
              <div className="aspect-square bg-gray-200" />

              <div className="p-4 space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
