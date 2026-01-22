import { Separator } from "@/components/ui/separator";
export default function NutritionFacts() {
  return (
    <div className="space-y-6  bg-white p-6 rounded-2xl shadow-lg">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Nutrition Facts</h2>
        <p className="text-xs text-muted-foreground">Per Serving</p>
      </div>
      <div className="space-y-2 text-sm">
        {[
          ["Calories", "280 kcal"],
          ["Protein", "7 g"],
          ["Carbs", "18 g"],
          ["Fat", "21 g"],
          ["Fiber", "5 g"],
        ].map(([label, value]) => (
          <>
            <div key={label} className="flex justify-between">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
            <Separator></Separator>
          </>
        ))}
      </div>
    </div>
  );
}
