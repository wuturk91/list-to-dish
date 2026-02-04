'use client';
import { useState } from "react";
import IngredientInput from "app/components/Molecules/IngredientInput";
import Recipe from "app/components/Molecules/Recipe";

interface Dish {
  name: string;
  description: string;
  prepTime: string;
  cookingTime: string;
  ingredients: { item: string; quantity: string }[];
  instructions: string[];
}

export default function Generate() {
  const [ dishes, setDishes ] = useState<Dish[]>([]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)]">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center py-10 px-6 md:px-16">
        <h1 className="text-2xl font-bold">Recipe Generator</h1>
        <p className="mb-4">Enter ingredients to generate dish ideas.</p>
        <IngredientInput setDishesAction={setDishes} />
        <div className="mt-8 w-full">
          {dishes.length > 0 &&
            <h2 className="text-lg font-semibold mb-4">Your Recipes</h2>
          }
          {dishes.length > 0 && dishes.map((dish, index) => {
            return (
              <Recipe key={index} dish={dish} />
            )
          })}
        </div>
      </main>
    </div>
  );
}