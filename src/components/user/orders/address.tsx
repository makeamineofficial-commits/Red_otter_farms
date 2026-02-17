import { MapPin, CreditCard } from "lucide-react";

export default function OrderAddresses({ shipping, billing }: any) {
  return (
    <div>
      <div className="mb-6">
        <div className="text-xs uppercase tracking-[4px] mb-2">
          Delivery Info
        </div>

        <h2 className="text-[#004b1a] text-4xl md:text-5xl tracking-[3px] font-dream-orphans">
          Addresses
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipping */}
        <AddressCard
          icon={<MapPin />}
          title="Shipping Address"
          data={shipping}
        />

        {/* Billing */}
        <AddressCard
          icon={<CreditCard />}
          title="Billing Address"
          data={billing}
        />
      </div>
    </div>
  );
}

function AddressCard({ icon, title, data }: any) {
  return (
    <div className="border-2 border-forest rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4 text-[#d7262d]">
        {icon}
        <h3 className="font-bold uppercase">{title}</h3>
      </div>

      <div className="space-y-1">
        <p className="font-bold">{data?.name}</p>
        <p>{data?.address}</p>
        <p>
          {data?.city}, {data?.state} {data?.zip}
        </p>
        <p>{data?.country}</p>
      </div>
    </div>
  );
}
