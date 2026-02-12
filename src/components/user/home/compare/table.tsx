import { Star } from "lucide-react";
import React from "react";
function Stars({ filled }: { filled: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={20}
          className={i < filled ? "#F5AAA3" : "transparent"}
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
         flex-[1_1_220px]
min-w-51
lg:flex-[0_0_300px]

            border-r
            border-forest/40
          "
        >
          <div className="h-25 lg:h-45 px-6 flex items-center text-sm font-semibold uppercase text-forest">
            Benefits
          </div>

          {rows.map((label) => (
            <div
              key={label}
              className="px-6 py-8 h-20 flex items-center justify-start text-sm font-semibold uppercase border-t border-forest/30 wrap-break-word lg:whitespace-nowrap"
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
    w-full
    grid-cols-[minmax(160px,1fr)_minmax(160px,1fr)]
    lg:grid-cols-[minmax(240px,1fr)_minmax(240px,1fr)]
  "
          >
            {/* Headers */}
            <div className="h-25 lg:h-45 flex justify-center items-center bg-forest">
              <img
                src="/logo-white.webp"
                alt="Red Otter Farms"
                className="h-20 lg:h-37.5"
              />
            </div>

            <div className="h-25 lg:h-45 flex justify-center items-center text-sm font-semibold uppercase text-forest">
              Others
            </div>

            {/* Rows */}
            {rows.map((label) => (
              <React.Fragment key={label}>
                <div className=" h-20 flex justify-center items-center bg-forest border-t border-herbal">
                  <Stars filled={5} />
                </div>
                <div className=" h-20 flex justify-center items-center border-t border-forest/30">
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
