export default function page() {
  return (
    <div className="min-h-screen bg-[#edefea]">
      {/* Hero Section */}
      <section className="bg-[#004b1a] text-white py-16 md:py-24">
        <div className=" mx-auto px-4 md:px-12 lg:px-18">
          <div className="max-w-4xl">
            <p className=" text-lg uppercase tracking-[4.27px] mb-5">
              Customer Support
            </p>
            <h1 className="font-dream-orphans text-5xl md:text-7xl tracking-[6px] leading-tight">
              Returns & Refund Policy
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className=" mx-auto px-4 md:px-12 lg:px-18">
          <div className=" space-y-8">
            <div>
              <p className=" text-[#1b1a21] leading-relaxed mb-4">
                At Red Otter Farms, we are committed to delivering the freshest,
                highest-quality produce. We understand that sometimes things
                don't go as planned, and we're here to make it right.
              </p>
            </div>

            <div>
              <h2 className="font-dream-orphans text-3xl text-[#004b1a] tracking-[3px] mb-4 uppercase">
                Our Freshness Guarantee
              </h2>
              <p className=" text-[#1b1a21] leading-relaxed mb-4">
                We guarantee that all produce will reach you fresh and in
                excellent condition. If you're not completely satisfied with the
                quality of any item, we'll make it right.
              </p>
              <p className=" text-[#1b1a21] leading-relaxed">
                All our products are delivered within 36 hours of harvest to
                ensure maximum freshness and nutritional value.
              </p>
            </div>

            <div>
              <h2 className="font-dream-orphans text-3xl text-[#004b1a] tracking-[3px] mb-4 uppercase">
                Return Eligibility
              </h2>
              <p className=" text-[#1b1a21] leading-relaxed mb-4">
                You may request a return or refund if:
              </p>
              <ul className="space-y-3 ml-6">
                <li className=" text-[#1b1a21] leading-relaxed list-disc">
                  The product arrived damaged or spoiled
                </li>
                <li className=" text-[#1b1a21] leading-relaxed list-disc">
                  You received the wrong item
                </li>
                <li className=" text-[#1b1a21] leading-relaxed list-disc">
                  The product quality does not meet our standards
                </li>
                <li className=" text-[#1b1a21] leading-relaxed list-disc">
                  Items are missing from your order
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-dream-orphans text-3xl text-[#004b1a] tracking-[3px] mb-4 uppercase">
                Return Timeline
              </h2>
              <p className=" text-[#1b1a21] leading-relaxed mb-4">
                Due to the perishable nature of our products, return requests
                must be made within{" "}
                <span className="font-bold">24 hours of delivery</span>.
              </p>
              <p className=" text-[#1b1a21] leading-relaxed">
                Please inspect your order immediately upon delivery and contact
                us right away if there are any issues.
              </p>
            </div>

            <div>
              <h2 className="font-dream-orphans text-3xl text-[#004b1a] tracking-[3px] mb-4 uppercase">
                How to Request a Return
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#004b1a] text-white flex items-center justify-center font-['Raleway',sans-serif] font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] mb-2">
                      Contact Us
                    </h3>
                    <p className=" text-[#1b1a21] leading-relaxed">
                      Email us at support@redotterfarms.in or call our customer
                      service within 24 hours of delivery.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#004b1a] text-white flex items-center justify-center font-['Raleway',sans-serif] font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] mb-2">
                      Provide Details
                    </h3>
                    <p className=" text-[#1b1a21] leading-relaxed">
                      Include your order number, photos of the product, and a
                      description of the issue.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#004b1a] text-white flex items-center justify-center font-['Raleway',sans-serif] font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] mb-2">
                      Receive Resolution
                    </h3>
                    <p className=" text-[#1b1a21] leading-relaxed">
                      We'll review your request and provide a solution within 24
                      hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-dream-orphans text-3xl text-[#004b1a] tracking-[3px] mb-4 uppercase">
                Refund Options
              </h2>
              <p className=" text-[#1b1a21] leading-relaxed mb-4">
                Once your return is approved, you can choose from the following
                options:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#e4e8e2] rounded-lg">
                  <h3 className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] text-xl mb-3">
                    Full Refund
                  </h3>
                  <p className=" text-[#1b1a21] leading-relaxed">
                    Receive a full refund to your original payment method within
                    5-7 business days.
                  </p>
                </div>
                <div className="p-6 bg-[#e4e8e2] rounded-lg">
                  <h3 className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] text-xl mb-3">
                    Replacement
                  </h3>
                  <p className=" text-[#1b1a21] leading-relaxed">
                    Get a replacement product delivered at no additional cost as
                    soon as possible.
                  </p>
                </div>
                <div className="p-6 bg-[#e4e8e2] rounded-lg">
                  <h3 className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] text-xl mb-3">
                    Store Credit
                  </h3>
                  <p className=" text-[#1b1a21] leading-relaxed">
                    Receive store credit for future purchases with an additional
                    10% bonus.
                  </p>
                </div>
                <div className="p-6 bg-[#e4e8e2] rounded-lg">
                  <h3 className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] text-xl mb-3">
                    Partial Refund
                  </h3>
                  <p className=" text-[#1b1a21] leading-relaxed">
                    For partial issues, receive a refund for the affected items
                    only.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-dream-orphans text-3xl text-[#004b1a] tracking-[3px] mb-4 uppercase">
                Non-Returnable Items
              </h2>
              <p className=" text-[#1b1a21] leading-relaxed mb-4">
                The following items cannot be returned:
              </p>
              <ul className="space-y-3 ml-6">
                <li className=" text-[#1b1a21] leading-relaxed list-disc">
                  Products that have been consumed or used
                </li>
                <li className=" text-[#1b1a21] leading-relaxed list-disc">
                  Items returned after the 24-hour window
                </li>
                <li className=" text-[#1b1a21] leading-relaxed list-disc">
                  Products damaged due to improper storage by the customer
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-dream-orphans text-3xl text-[#004b1a] tracking-[3px] mb-4 uppercase">
                Cancellation Policy
              </h2>
              <p className=" text-[#1b1a21] leading-relaxed mb-4">
                You may cancel your order at no charge before it has been
                harvested and packed. Once harvesting begins, cancellations may
                be subject to a restocking fee.
              </p>
              <p className=" text-[#1b1a21] leading-relaxed">
                To cancel an order, contact us immediately at
                support@redotterfarms.in with your order number.
              </p>
            </div>

            <div>
              <h2 className="font-dream-orphans text-3xl text-[#004b1a] tracking-[3px] mb-4 uppercase">
                Refund Processing Time
              </h2>
              <p className=" text-[#1b1a21] leading-relaxed mb-4">
                Approved refunds will be processed within 5-7 business days and
                credited to your original payment method.
              </p>
              <p className=" text-[#1b1a21] leading-relaxed">
                Please note that it may take an additional 3-5 business days for
                the refund to appear in your account, depending on your bank or
                payment provider.
              </p>
            </div>

            <div>
              <h2 className="font-dream-orphans text-3xl text-[#004b1a] tracking-[3px] mb-4 uppercase">
                Contact Us
              </h2>
              <p className=" text-[#1b1a21] leading-relaxed mb-4">
                If you have any questions about our Returns and Refund Policy,
                please don't hesitate to contact us:
              </p>
              <div className="p-6 bg-[#e4e8e2] rounded-lg">
                <p className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] mb-2">
                  Red Otter Farms Customer Support
                </p>
                <p className=" text-[#1b1a21]">
                  Email: support@redotterfarms.in
                </p>
                <p className=" text-[#1b1a21]">
                  Phone: Available Monday-Saturday, 9 AM - 6 PM IST
                </p>
                <p className=" text-[#1b1a21]">Website: www.redotterfarms.in</p>
              </div>
            </div>

            <div className="border-t border-[#004b1a] pt-6 mt-8">
              <p className=" text-sm text-[#717182]">
                Last updated: February 17, 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
