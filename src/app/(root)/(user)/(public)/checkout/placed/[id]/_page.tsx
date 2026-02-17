import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  CreditCard,
  ShoppingBag,
  Sparkles,
  Wallet,
  Activity,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

// Mock order data
const orderData = {
  orderNumber: "ROF-2026-0217-8472",
  orderDate: "February 17, 2026",
  estimatedDelivery: "February 19, 2026",
  user: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
  },
  shippingAddress: {
    name: "Sarah Johnson",
    street: "123 Oak Street",
    city: "Portland",
    state: "OR",
    zip: "97201",
    country: "USA",
  },
  billingAddress: {
    name: "Sarah Johnson",
    street: "123 Oak Street",
    city: "Portland",
    state: "OR",
    zip: "97201",
    country: "USA",
  },
  cartItems: [
    {
      id: 1,
      name: "Organic Mixed Vegetables Box",
      quantity: 2,
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1657288089316-c0350003ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZnJlc2glMjB2ZWdldGFibGVzJTIwZmFybXxlbnwxfHx8fDE3NzEzNDIyODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      name: "Farm Fresh Eggs (Dozen)",
      quantity: 1,
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1756361946794-d7976ff5f765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZnJlc2glMjBlZ2dzJTIwZGFpcnl8ZW58MXx8fHwxNzcxMzI5MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      name: "Raw Organic Honey",
      quantity: 1,
      price: 16.99,
      image:
        "https://images.unsplash.com/photo-1645549826194-1956802d83c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaG9uZXklMjBqYXJ8ZW58MXx8fHwxNzcxMjkyMTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
  pricing: {
    subtotal: 75.96,
    discount: 7.6,
    shipping: 5.0,
    tax: 6.08,
    total: 79.44,
  },
};

const recommendedProducts = [
  {
    id: 4,
    name: "Fresh Organic Berries",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1722553546111-8ac6379f1165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjBmcnVpdHMlMjBiZXJyaWVzfGVufDF8fHx8MTc3MTM0MjI4MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    name: "Organic Leafy Greens",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1657288089316-c0350003ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZnJlc2glMjB2ZWdldGFibGVzJTIwZmFybXxlbnwxfHx8fDE3NzEzNDIyODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    name: "Artisan Cheese Collection",
    price: 22.99,
    image:
      "https://images.unsplash.com/photo-1756361946794-d7976ff5f765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZnJlc2glMjBlZ2dzJTIwZGFpcnl8ZW58MXx8fHwxNzcxMzI5MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 7,
    name: "Organic Honey Combo",
    price: 28.99,
    image:
      "https://images.unsplash.com/photo-1645549826194-1956802d83c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaG9uZXklMjBqYXJ8ZW58MXx8fHwxNzcxMjkyMTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export default function page() {
  return (
    <div className="bg-white">
      {/* Success Header - Dark Green Background */}
      <div className="bg-[#004b1a] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-[#edefea]" />
          </div>
          <h1 className="font-['Dream_Orphans',sans-serif] text-6xl md:text-7xl tracking-[4px] mb-4">
            Order Confirmed!
          </h1>
          <p className="font-['Inter',sans-serif] text-[#edefea] text-lg max-w-2xl mx-auto mb-6">
            Thank you for your order. We'll send you a confirmation email
            shortly.
          </p>
          <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
            <span className="font-['Inter',sans-serif] text-[#edefea] text-sm uppercase tracking-[2px]">
              Order Number:
            </span>
            <span className="font-['Raleway',sans-serif] font-bold text-white text-lg tracking-wider">
              {orderData.orderNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-16">
        {/* Order Details Section */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Left Column - Cart Items & Addresses */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="mb-6">
                <div className="font-['Inter',sans-serif] text-[#1b1a21] text-xs uppercase tracking-[4px] mb-2">
                  Your Items
                </div>
                <h2 className="font-['Dream_Orphans',sans-serif] text-[#004b1a] text-5xl tracking-[3px]">
                  Order Details
                </h2>
              </div>

              <div className="border-2 border-[#004b1a] rounded-lg overflow-hidden">
                {orderData.cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex gap-6 p-6 ${index !== orderData.cartItems.length - 1 ? "border-b border-[#004b1a]" : ""}`}
                  >
                    <div className="w-28 h-28 relative rounded-lg overflow-hidden bg-[#edefea] shrink-0">
                      <Image
                        fill
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] text-lg uppercase tracking-wide mb-2">
                        {item.name}
                      </h3>
                      <p className="font-['Inter',sans-serif] text-[#1b1a21] text-sm">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-['Raleway',sans-serif] font-bold text-[#004b1a] text-xl">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="font-['Inter',sans-serif] text-[#1b1a21] text-sm mt-1">
                        ₹{item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Billing Addresses */}
            <div>
              <div className="mb-6">
                <div className="font-['Inter',sans-serif] text-[#1b1a21] text-xs uppercase tracking-[4px] mb-2">
                  Delivery Info
                </div>
                <h2 className="font-['Dream_Orphans',sans-serif] text-[#004b1a] text-5xl tracking-[3px]">
                  Addresses
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Shipping Address */}
                <div className="border-2 border-[#004b1a] rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-[#d7262d]" />
                    <h3 className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide">
                      Shipping Address
                    </h3>
                  </div>
                  <div className="font-['Inter',sans-serif] text-[#1b1a21] space-y-1">
                    <p className="font-bold">
                      {orderData.shippingAddress.name}
                    </p>
                    <p>{orderData.shippingAddress.street}</p>
                    <p>
                      {orderData.shippingAddress.city},{" "}
                      {orderData.shippingAddress.state}{" "}
                      {orderData.shippingAddress.zip}
                    </p>
                    <p>{orderData.shippingAddress.country}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#004b1a]/20">
                    <p className="font-['Inter',sans-serif] text-sm">
                      <span className="text-[#1b1a21]/60 uppercase tracking-wide">
                        Est. Delivery:{" "}
                      </span>
                      <span className="font-bold text-[#004b1a]">
                        {orderData.estimatedDelivery}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="border-2 border-[#004b1a] rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-[#d7262d]" />
                    <h3 className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide">
                      Billing Address
                    </h3>
                  </div>
                  <div className="font-['Inter',sans-serif] text-[#1b1a21] space-y-1">
                    <p className="font-bold">{orderData.billingAddress.name}</p>
                    <p>{orderData.billingAddress.street}</p>
                    <p>
                      {orderData.billingAddress.city},{" "}
                      {orderData.billingAddress.state}{" "}
                      {orderData.billingAddress.zip}
                    </p>
                    <p>{orderData.billingAddress.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-6">
                <div className="font-['Inter',sans-serif] text-[#1b1a21] text-xs uppercase tracking-[4px] mb-2">
                  Get in touch
                </div>
                <h2 className="font-['Dream_Orphans',sans-serif] text-[#004b1a] text-5xl tracking-[3px]">
                  Contact Info
                </h2>
              </div>

              <div className="border-2 border-[#004b1a] rounded-lg p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="font-['Inter',sans-serif] text-[#1b1a21]/60 text-xs uppercase tracking-[2px] mb-2">
                      Name
                    </p>
                    <p className="font-['Raleway',sans-serif] font-bold text-[#1b1a21]">
                      {orderData.user.name}
                    </p>
                  </div>
                  <div>
                    <p className="font-['Inter',sans-serif] text-[#1b1a21]/60 text-xs uppercase tracking-[2px] mb-2">
                      Email
                    </p>
                    <p className="font-['Inter',sans-serif] text-[#1b1a21]">
                      {orderData.user.email}
                    </p>
                  </div>
                  <div>
                    <p className="font-['Inter',sans-serif] text-[#1b1a21]/60 text-xs uppercase tracking-[2px] mb-2">
                      Phone
                    </p>
                    <p className="font-['Inter',sans-serif] text-[#1b1a21]">
                      {orderData.user.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-50 h-fit">
            <div className="mb-6">
              <div className="font-['Inter',sans-serif] text-[#1b1a21] text-xs uppercase tracking-[4px] mb-2">
                Bill Details
              </div>
              <h2 className="font-['Dream_Orphans',sans-serif] text-[#004b1a] text-4xl tracking-[3px]">
                Summary
              </h2>
            </div>

            <div className="border-2 border-[#004b1a] rounded-lg p-6 bg-[#edefea]">
              <div className="space-y-4 font-['Inter',sans-serif]">
                <div className="flex justify-between text-[#1b1a21]">
                  <span>Subtotal</span>
                  <span className="font-bold">
                    ₹{orderData.pricing.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#d7262d]">
                  <span>Discount (10%)</span>
                  <span className="font-bold">
                    -₹{orderData.pricing.discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#1b1a21]">
                  <span>Shipping</span>
                  <span className="font-bold">
                    ₹{orderData.pricing.shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#1b1a21]">
                  <span>Tax</span>
                  <span className="font-bold">
                    ₹{orderData.pricing.tax.toFixed(2)}
                  </span>
                </div>
                <div className="border-t-2 border-[#004b1a] pt-4 mt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide">
                      Total
                    </span>
                    <span className="font-['Raleway',sans-serif] font-bold text-[#004b1a] text-3xl">
                      ₹{orderData.pricing.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-[#d7262d] text-white font-['Inter',sans-serif] font-bold uppercase tracking-[1.5px] py-4 rounded-[23px] border-2 border-[#d7262d] hover:bg-[#b81f25] transition-colors">
                Track Order
              </button>
            </div>
          </div>
        </div>

        {/* Premium Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="font-['Inter',sans-serif] text-[#1b1a21] text-xs uppercase tracking-[4px] mb-2">
              Premium Benefits
            </div>
            <h2 className="font-['Dream_Orphans',sans-serif] text-[#004b1a] text-6xl tracking-[3px] mb-4">
              Unlock Exclusive Features
            </h2>
            <p className="font-['Inter',sans-serif] text-[#1b1a21] text-lg max-w-2xl mx-auto">
              Enhance your Red Otter Farms experience with exclusive benefits
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Otter Wallet */}
            <div className="border-2 border-[#004b1a] rounded-lg p-8 bg-linear-to-br from-amber-50 to-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#004b1a]/5 rounded-full -mr-20 -mt-20"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-[#004b1a] rounded-lg flex items-center justify-center">
                    <Wallet className="w-8 h-8 text-[#edefea]" />
                  </div>
                  <div className="border-2 border-[#004b1a] rounded-full px-4 py-1">
                    <span className="font-['Raleway',sans-serif] font-bold text-[#004b1a] text-xs uppercase tracking-wide">
                      Premium
                    </span>
                  </div>
                </div>

                <h3 className="font-['Dream_Orphans',sans-serif] text-[#004b1a] text-4xl tracking-[2px] mb-4">
                  Otter Wallet
                </h3>

                <p className="font-['Inter',sans-serif] text-[#1b1a21] mb-6">
                  Add money to your Otter Wallet and enjoy exclusive benefits on
                  every purchase
                </p>

                <ul className="space-y-3 mb-8 font-['Inter',sans-serif] text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d7262d] shrink-0" />
                    <span>5% cashback on all orders</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d7262d] shrink-0" />
                    <span>Priority delivery slots</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d7262d] shrink-0" />
                    <span>Zero transaction fees</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d7262d] shrink-0" />
                    <span>Exclusive early access to new products</span>
                  </li>
                </ul>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-['Raleway',sans-serif] font-bold text-[#004b1a] text-4xl">
                    ₹799
                  </span>
                  <span className="font-['Inter',sans-serif] text-[#1b1a21]">
                    /month
                  </span>
                </div>

                <button className="w-full bg-[#004b1a] text-white font-['Inter',sans-serif] font-bold uppercase tracking-[1.5px] py-4 rounded-[23px] border-2 border-[#004b1a] hover:bg-[#003814] transition-colors flex items-center justify-center gap-2">
                  Activate Otter Wallet
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Nutrition Meter */}
            <div className="border-2 border-[#004b1a] rounded-lg p-8 bg-linear-to-br from-green-50 to-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#004b1a]/5 rounded-full -mr-20 -mt-20"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-[#d7262d] rounded-lg flex items-center justify-center">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <div className="border-2 border-[#d7262d] rounded-full px-4 py-1">
                    <span className="font-['Raleway',sans-serif] font-bold text-[#d7262d] text-xs uppercase tracking-wide">
                      Pro
                    </span>
                  </div>
                </div>

                <h3 className="font-['Dream_Orphans',sans-serif] text-[#004b1a] text-4xl tracking-[2px] mb-4">
                  Nutrition Meter
                </h3>

                <p className="font-['Inter',sans-serif] text-[#1b1a21] mb-6">
                  Track your nutrition goals and get personalized product
                  recommendations
                </p>

                <ul className="space-y-3 mb-8 font-['Inter',sans-serif] text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d7262d] shrink-0" />
                    <span>Complete nutritional breakdown</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d7262d] shrink-0" />
                    <span>AI-powered meal planning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d7262d] shrink-0" />
                    <span>Custom dietary preferences</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#d7262d] shrink-0" />
                    <span>Weekly nutrition reports</span>
                  </li>
                </ul>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-['Raleway',sans-serif] font-bold text-[#004b1a] text-4xl">
                    ₹599
                  </span>
                  <span className="font-['Inter',sans-serif] text-[#1b1a21]">
                    /month
                  </span>
                </div>

                <button className="w-full bg-[#d7262d] text-white font-['Inter',sans-serif] font-bold uppercase tracking-[1.5px] py-4 rounded-[23px] border-2 border-[#d7262d] hover:bg-[#b81f25] transition-colors flex items-center justify-center gap-2">
                  Start Nutrition Meter
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bundle Offer */}
          <div className="border-2 border-[#004b1a] rounded-lg p-8 bg-[#edefea]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6 flex-1">
                <div className="w-20 h-20 bg-linear-to-br from-[#004b1a] to-[#d7262d] rounded-lg flex items-center justify-center shrink-0">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="font-['Dream_Orphans',sans-serif] text-[#004b1a] text-4xl tracking-[2px] mb-2">
                    Otter Gold Bundle
                  </h3>
                  <p className="font-['Inter',sans-serif] text-[#1b1a21]">
                    Get both Otter Wallet + Nutrition Meter and save 30%
                  </p>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="flex items-baseline gap-3 mb-4 justify-center lg:justify-end">
                  <span className="font-['Raleway',sans-serif] text-2xl line-through text-[#1b1a21]/40">
                    ₹1,398
                  </span>
                  <span className="font-['Raleway',sans-serif] font-bold text-[#d7262d] text-5xl">
                    ₹999
                  </span>
                  <span className="font-['Inter',sans-serif] text-[#1b1a21]">
                    /month
                  </span>
                </div>
                <button className="bg-linear-to-r from-[#004b1a] to-[#d7262d] text-white font-['Inter',sans-serif] font-bold uppercase tracking-[1.5px] px-8 py-4 rounded-[23px] border-2 border-transparent hover:scale-105 transition-transform flex items-center gap-2">
                  Get Otter Gold
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Explore More Products */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="font-['Inter',sans-serif] text-[#1b1a21] text-xs uppercase tracking-[4px] mb-2">
                Our Picks for You
              </div>
              <h2 className="font-['Dream_Orphans',sans-serif] text-[#004b1a] text-6xl tracking-[3px]">
                Explore More
              </h2>
            </div>
            <button className="bg-[#d7262d] text-white font-['Inter',sans-serif] font-bold uppercase tracking-[1.5px] px-8 py-4 rounded-[23px] border-2 border-[#d7262d] hover:bg-[#b81f25] transition-colors flex items-center gap-2">
              Shop All
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="border-2 border-[#004b1a] rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className=" relative aspect-square overflow-hidden bg-[#edefea]">
                  <Image
                    fill
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-3 line-clamp-2 min-h-10">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-['Raleway',sans-serif] font-bold text-[#004b1a] text-xl">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <button className="border-2 border-[#d7262d] text-[#d7262d] font-['Raleway',sans-serif] font-bold uppercase tracking-wide text-xs px-4 py-2 rounded-[23px] hover:bg-[#d7262d] hover:text-white transition-colors">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="border-2 border-[#004b1a] rounded-lg p-12 text-center bg-linear-to-br from-[#edefea] to-white">
          <ShoppingBag className="w-16 h-16 text-[#d7262d] mx-auto mb-6" />
          <h2 className="font-['Dream_Orphans',sans-serif] text-[#004b1a] text-5xl tracking-[3px] mb-4">
            Want to Add More?
          </h2>
          <p className="font-['Inter',sans-serif] text-[#1b1a21] text-lg max-w-2xl mx-auto mb-8">
            Continue shopping and discover more fresh, organic products from our
            farm
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#d7262d] text-white font-['Inter',sans-serif] font-bold uppercase tracking-[1.5px] px-10 py-4 rounded-[23px] border-2 border-[#d7262d] hover:bg-[#b81f25] transition-colors flex items-center justify-center gap-2">
              Continue Shopping
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button className="bg-white text-[#004b1a] font-['Inter',sans-serif] font-bold uppercase tracking-[1.5px] px-10 py-4 rounded-[23px] border-2 border-[#004b1a] hover:bg-[#004b1a] hover:text-white transition-colors">
              View Order History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
