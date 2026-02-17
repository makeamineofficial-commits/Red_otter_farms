import {
  CheckCircle,
  Wallet,
  Activity,
  Sparkles,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";

export function Premium() {
  return (
    <section className="mb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[4px] mb-2">
          Premium Benefits
        </p>

        <h2 className="font-dream-orphans text-forest text-[2rem] lg:text-[3.5rem] 2xl:text-[4.75rem]">
          Unlock Exclusive Features
        </h2>

        <p className="text-md sm:text-lg max-w-2xl mx-auto">
          Enhance your shopping experience with premium tools
        </p>
      </div>

      {/* Main Plans */}
      <div className="grid lg:grid-cols-3 gap-4 xl:gap-8 mb-12">
        {/* Otter Wallet */}
        <PlanCard
          icon={<Wallet className="w-8 h-8 text-[#edefea]" />}
          iconBg="bg-[#004b1a]"
          title="Otter Wallet"
          desc="Get cashback and priority delivery on every order."
          price="₹799"
          btnText="Activate"
          btnClass="bg-[#004b1a]"
          bgClass="bg-gradient-to-br from-amber-50 via-amber-100/40 to-white"
          features={[
            "5% cashback",
            "Priority slots",
            "Zero fees",
            "Early access",
          ]}
        />

        {/* Nutrition */}
        <PlanCard
          icon={<Activity className="w-8 h-8 text-white" />}
          iconBg="bg-[#d7262d]"
          title="Nutrition Meter"
          desc="Track calories, nutrients, and health goals."
          price="₹599"
          btnText="Start Now"
          btnClass="bg-[#d7262d]"
          bgClass="bg-gradient-to-br from-emerald-50 via-rose-50/40 to-white"
          features={[
            "Nutrition reports",
            "Meal planning",
            "Diet filters",
            "AI insights",
          ]}
        />
        {/* Otter Pass */}
        <PlanCard
          icon={<Sparkles className="w-8 h-8 text-white" />}
          iconBg="bg-gradient-to-br from-[#004b1a] to-[#d7262d]"
          title="Otter Pass"
          desc="Best value plan for frequent shoppers."
          price="₹399"
          btnText="Get Pass"
          btnClass="bg-[#004b1a]"
          bgClass="bg-gradient-to-br from-green-50 via-red-50/40 to-white"
          features={[
            "Free deliveries",
            "Extra discounts",
            "Early sales access",
            "Member support",
          ]}
        />
      </div>

      {/* Survey Section */}
      <div className="border-2 border-[#004b1a] rounded-lg p-10 bg-white text-center mx-auto">
        <ClipboardList size={48} className="text-[#d7262d] mx-auto mb-4" />

        <h3 className="font-['Dream_Orphans'] text-3xl text-[#004b1a] mb-3">
          Help Us Personalize Your Experience
        </h3>

        <p className="max-w-xl mx-auto mb-6">
          Take a quick 2-minute survey to get better recommendations and
          exclusive offers.
        </p>
        <Link href="/survey">
          <button className="bg-[#004b1a] uppercase text-white px-8 py-3 rounded-[10px] font-bold hover:bg-[#003814] transition">
            Take Survey
          </button>
        </Link>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Reusable Plan Card */
/* ---------------------------------- */

function PlanCard({
  icon,
  iconBg,
  title,
  desc,
  price,
  btnText,
  btnClass,
  features,
  bgClass,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
  price: string;
  btnText: string;
  btnClass: string;
  features: string[];
  bgClass: string;
}) {
  return (
    <div
      className={`border-2 flex flex-col border-[#004b1a] rounded-lg p-4 xl:p-8 relative ${bgClass}`}
    >
      <div className="flex-1">
        <h3 className="font-['Dream_Orphans'] text-3xl text-[#004b1a] mb-3">
          {title}
        </h3>

        <p className="mb-6">{desc}</p>

        <ul className="space-y-3 text-sm mb-6">
          {features.map((item) => (
            <li key={item} className="flex gap-2">
              <CheckCircle className="text-[#d7262d]" size={18} />
              {item}
            </li>
          ))}
        </ul>

        <div className="mb-6">
          <span className="font-bold text-4xl text-[#004b1a]">{price}</span>
          <span>/month</span>
        </div>
      </div>

      <button
        className={`w-full mt-auto items-center text-white py-4 rounded-[10px] font-bold flex justify-center gap-2 ${btnClass}`}
      >
        Know More
        {/* {btnText} */}
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
