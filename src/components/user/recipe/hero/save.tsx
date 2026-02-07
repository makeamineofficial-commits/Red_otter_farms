"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { saveRecipe } from "@/actions/user/recipes/saves.action";
import { useRouter, usePathname } from "next/navigation";

import { toast } from "sonner";
import { Recipe } from "@/types/recipe";

export default function Save({
  recipe,
}: {
  recipe: Recipe & { recipeSaved: boolean };
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isSaved, setSaved] = useState(recipe.recipeSaved);

  const heartClass = isSaved
    ? "h-4 w-4 fill-red-500 stroke-red-500"
    : "h-4 w-4 fill-transparent stroke-gray-600";

  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={loading}
      onClick={async () => {
        try {
          setLoading(true);

          const res = await saveRecipe({ recipeId: recipe.publicId });

          if (res.authenticationRequired) {
            router.push(`${pathname}?login=true`);
            return;
          }

          setSaved((prev) => !prev);
          toast.info(res.message);
        } catch {
          toast.warning("Failed to mark recipe saved");
        } finally {
          setLoading(false);
        }
      }}
    >
      <Heart className={heartClass} />
      {isSaved ? "Remove from Save" : "Add to Save"}
    </Button>
  );
}
