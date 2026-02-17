import { CheckCircle } from "lucide-react";

export default function OrderHeader() {
  return (
    <div className="bg-forest text-white py-16 px-4 ">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12" />
        </div>

        <h1 className=" text-4xl md:text-5xl font-bold uppercase font-dream-orphans">
          Order Confirmed
        </h1>

        <p className="text-white/80">Your order has been placed successfully</p>
      </div>
    </div>
  );
}
