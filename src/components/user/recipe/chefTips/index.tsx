import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
export default function ChefTips() {
  return (
     <Card className="rounded-2xl border-0 border-l-4 border-l-green-500 bg-green-50/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="size-5 text-green-600" /> Chef's Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>• Chill the veggies before serving for extra crunch.</p>
        <p>• Add olives or chickpeas for more protein.</p>
        <p>• Best enjoyed fresh, avoid storing after dressing.</p>
      </CardContent>
    </Card>
  );
}
