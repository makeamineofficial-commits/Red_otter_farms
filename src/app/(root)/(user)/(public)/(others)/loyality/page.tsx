export default function Page() {
  return (
    <div className="min-h-screen bg-[#edefea]">
      {/* Hero Section */}
      <section className="bg-[#004b1a] text-white py-16 md:py-24">
        <div className="mx-auto px-4 md:px-12 lg:px-18">
          <div className="max-w-4xl">
            <p className="text-lg uppercase tracking-[4.27px] mb-5">
              Red Otter Membership
            </p>

            <h1 className="font-dream-orphans text-5xl md:text-7xl tracking-[6px] leading-tight">
              Loyalty Program
            </h1>

            <p className="text-lg mt-6 text-[#e4e8e2] max-w-2xl">
              The more you spend, the more you unlock. Your membership tier is
              automatically upgraded based on your cumulative annual spending
              with us.
            </p>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="py-14 md:py-20">
        <div className="mx-auto px-4 md:px-12 lg:px-18">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-[#d9ded8] p-8 hover:shadow-md transition">
              <p className="text-sm uppercase tracking-widest text-[#717182] mb-2">
                Unlocked at ₹15,000 Spend
              </p>

              <h2 className="font-dream-orphans text-3xl tracking-[3px] text-[#004b1a] mb-4 uppercase">
                Tier 1: Access
              </h2>

              <ul className="space-y-3 text-[#1b1a21]">
                <li>• 5% Discount on All Products</li>
                <li>• 25% Off OtterN Subscription</li>
                <li>• 50% Off Nutrition Meter Subscription</li>
                <li>• 2 Complimentary Gift Boxes</li>
                <li>• 15% Off Additional Gift Boxes</li>
                <li>• 50% Off Otter Pass Subscription</li>
              </ul>
            </div>

            {/* Tier 2 */}
            <div className="bg-white rounded-xl shadow-md  border border-[#d9ded8] p-8 relative">
              <p className="text-sm uppercase tracking-widest text-[#717182] mb-2">
                Unlocked at ₹30,000 Spend
              </p>

              <h2 className="font-dream-orphans text-3xl tracking-[3px] text-[#004b1a] mb-4 uppercase">
                Tier 2: Privy
              </h2>

              <ul className="space-y-3 text-[#1b1a21]">
                <li>• 10% Discount on All Products</li>
                <li>• 50% Off OtterN Subscription</li>
                <li>• Complimentary Nutrition Meter Subscription</li>
                <li>• 5 Complimentary Gift Boxes</li>
                <li>• 50% Off Additional Gift Boxes</li>
                <li>• 75% Off Otter Pass Subscription</li>
              </ul>
            </div>

            {/* Tier 3 */}
            <div className="bg-white rounded-xl shadow-sm border border-[#d9ded8] p-8 hover:shadow-md transition">
              <p className="text-sm uppercase tracking-widest text-[#717182] mb-2">
                Unlocked at ₹75,000 Spend
              </p>

              <h2 className="font-dream-orphans text-3xl tracking-[3px] text-[#004b1a] mb-4 uppercase">
                Tier 3: Signature
              </h2>

              <ul className="space-y-3 text-[#1b1a21]">
                <li>• 15% Discount on All Products</li>
                <li>• Complimentary OtterN Subscription</li>
                <li>• Complimentary Nutrition Meter Subscription</li>
                <li>• 10 Complimentary Gift Boxes</li>
                <li>• 50% Off Additional Gift Boxes</li>
                <li>• Complimentary Otter Pass Subscription</li>
              </ul>
            </div>
          </div>

          {/* Explanation Section */}
          <div className="mt-16 space-y-8 max-w-4xl">
            <div>
              <h2 className="font-dream-orphans text-3xl text-[#004b1a] tracking-[3px] mb-4 uppercase">
                How Qualification Works
              </h2>
              <p className="text-[#1b1a21] leading-relaxed">
                Your tier is determined by your cumulative spending. Once your
                total purchases cross a tier threshold, your membership is
                automatically upgraded. Higher tiers unlock stronger benefits
                and exclusive privileges.
              </p>
            </div>

            <div>
              <h2 className="font-dream-orphans text-3xl text-[#004b1a] tracking-[3px] mb-4 uppercase">
                Important Notes
              </h2>
              <ul className="text-[#1b1a21] space-y-3">
                <li>• Gift boxes are subject to availability.</li>
                <li>• Benefits apply only to active members.</li>
                <li>• Discounts cannot be combined unless stated otherwise.</li>
                <li>
                  • Red Otter Farms reserves the right to modify benefits.
                </li>
              </ul>
            </div>

            <div className="border-t border-[#004b1a] pt-6 mt-8">
              <p className="text-sm text-[#717182]">Updated February 2026</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
