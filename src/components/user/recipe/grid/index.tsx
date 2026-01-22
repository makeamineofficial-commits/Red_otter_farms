import { RecipeCard } from "@/components/common/recipeCard";

const recipes = [
  {
    title: "Mediterranean Veggie Salad",
    description:
      "A fresh and colorful salad packed with crispy vegetables, olives, and feta cheese.",
    time: "15 min",
    servings: "4 servings",
    difficulty: "Easy",
  },
  {
    title: "Berry Smoothie Bowl",
    description:
      "Creamy and nutritious smoothie bowl topped with fresh fruits and granola.",
    time: "10 min",
    servings: "2 servings",
    difficulty: "Easy",
  },
  {
    title: "Grilled Vegetable Medley",
    description:
      "Perfectly charred seasonal vegetables with herbs and balsamic glaze.",
    time: "25 min",
    servings: "4 servings",
    difficulty: "Medium",
  },
  {
    title: "Hearty Vegetable Soup",
    description:
      "Warming and nutritious soup loaded with seasonal vegetables and herbs.",
    time: "35 min",
    servings: "6 servings",
    difficulty: "Easy",
  },
  {
    title: "Fresh Fruit Tart",
    description:
      "Elegant dessert featuring a buttery crust filled with pastry cream.",
    time: "45 min",
    servings: "8 servings",
    difficulty: "Medium",
  },
  {
    title: "Roasted Vegetable Bowl",
    description:
      "Nutritious grain bowl with perfectly roasted vegetables and tangy dressing.",
    time: "40 min",
    servings: "4 servings",
    difficulty: "Easy",
  },
];

export function Grid() {
  return (
    <article className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        //  @ts-ignore
        <RecipeCard key={recipe.title} {...recipe} />
      ))}
    </article>
  );
}
