import { Star } from "lucide-react";
import React from "react";
function Stars({ filled }: { filled: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={20}
          className="stroke-forest"
          fill={i < filled ? "#F5AAA3" : "transparent"}
        />
      ))}
    </div>
  );
}

const rows = [
  "Farm to door",
  "Greens stay crisp longer",
  "Skip or pause anytime",
  "Washed and ready to eat",
  "No minimum commitment",
];
export default function ComparisonTable() {
  return (
    <section className="mx-auto max-w-full overflow-hidden">
      <div className="flex border border-forest/40 max-w-full overflow-hidden">
        {/* LEFT COLUMN */}
        <div
          className="
            shrink-0
            min-w-max
            lg:min-w-sm
            border-r
            border-forest/40
          "
        >
          <div className="h-45.5 px-6 flex items-center text-sm font-semibold uppercase text-forest">
            Benefits
          </div>

          {rows.map((label) => (
            <div
              key={label}
              className="px-6 py-8 text-sm font-semibold uppercase border-t border-forest/30 whitespace-nowrap"
            >
              {label}
            </div>
          ))}
        </div>

        {/* SCROLLABLE COLUMNS */}
        <div
          className="
            min-w-0        
            w-full
            overflow-x-auto
            no-scrollbar
          "
        >
          <div
            className="
              grid
              grid-cols-[minmax(240px,1fr)_minmax(240px,1fr)]
              min-w-max
              lg:min-w-lg
              lg:grid-cols-2 
            "
          >
            {/* Headers */}
            <div className="h-45.5 flex justify-center items-center bg-forest">
              <img
                src="/logo-white.webp"
                alt="Red Otter Farms"
                className="h-37.5"
              />
            </div>

            <div className="h-45.5 flex justify-center items-center text-sm font-semibold uppercase text-forest">
              Others
            </div>

            {/* Rows */}
            {rows.map((label) => (
              <React.Fragment key={label}>
                <div className="py-8 flex justify-center bg-forest border-t border-forest/30">
                  <Stars filled={5} />
                </div>
                <div className="py-8 flex justify-center border-t border-forest/30">
                  <Stars filled={1} />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
