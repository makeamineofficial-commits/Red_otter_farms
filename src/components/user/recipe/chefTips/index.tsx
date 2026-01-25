import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Recipe } from "@/types/recipe";
export default function ChefTips({ chefTips }: Recipe) {
  return (
    <Card className="rounded-2xl border-0 border-l-4 border-l-green-500 bg-green-50/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="size-5 text-green-600" /> Chef's Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {chefTips.map((ele) => (
          <p>• {ele}.</p>
        ))}
      </CardContent>
    </Card>
  );
}
