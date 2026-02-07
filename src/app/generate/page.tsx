'use client';
import { useState } from "react";
import IngredientInput from "app/components/Molecules/IngredientInput";
import RecipeCard from "app/components/Molecules/RecipeCard";
import { type Recipe } from "app/types";

export default function Generate() {
  const [ recipes, setRecipes ] = useState<Recipe[]>([]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)]">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center py-10 px-6 md:px-16">
        <h1 className="text-2xl font-bold">Recipe Generator</h1>
        <p className="mb-4">Enter ingredients to generate recipes.</p>
        <IngredientInput setRecipeAction={setRecipes} />
        <div className="mt-8 w-full">
          {recipes && recipes.length > 0 &&
            <h2 className="text-lg font-semibold mb-4">Your Recipes</h2>
          }
          {recipes && recipes.length > 0 && recipes.map((recipe, index) => {
            return (
              <RecipeCard key={index} recipe={recipe} />
            )
          })}
        </div>
      </main>
    </div>
  );
}