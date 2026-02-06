'use client'
import { useState } from "react"
import { saveRecipe } from "app/lib/actions"

export interface Dish {
  name: string
  description: string
  prepTime: string
  cookingTime: string
  ingredients: { item: string; quantity: string }[]
  instructions: string[]
}

export default function Recipe({ dish }: { dish: Dish }) {
  const [ expanded, setExpanded ] = useState(false)
  const [ saved, setSaved ] = useState(false)
  const [ saving, setSaving ] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    const result = await saveRecipe(dish)
    setSaving(false)
    if (result && result.success) {
      setSaved(true)
    } else {
      console.error('Error saving recipe', result) // replace with user-facing error message and get error details
    }
  }

  return (
    <div className="mb-4 rounded-lg border border-gray-300 shadow-sm bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)]">
      <button className="flex flex-col p-4 text-md font-medium mb-2 w-full" onClick={() => setExpanded(!expanded)}>
        <h3 className="flex justify-start text-lg font-semibold">{dish.name}</h3>
        <p className="flex justify-start whitespace-pre-line">{dish.description}</p>
      </button>
      
      {expanded && (
        <div className="rounded-b-lg px-4 py-3 dark:border-gray-700 bg-white text-black">
          <p className="mt-2 text-sm">Prep Time: {dish.prepTime} mins | Cooking Time: {dish.cookingTime} mins</p>
          <div className="mt-3">
            <h4 className="font-semibold text-xl mb-2">Ingredients</h4>
            <ul className="list-disc list-inside">
              {dish.ingredients.map((ingredient, id) => (
                <li key={id}>{ingredient.quantity} of {ingredient.item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-3">
            <h4 className="font-semibold text-xl mb-2">Instructions</h4>
            <ol className="list-decimal list-inside">
              {dish.instructions.map((step, id) => (
                <li key={id} className="mb-1">{step}</li>
              ))}
            </ol>
          </div>
          <button
            className={"mt-4 px-4 py-2 rounded-md " + (saved ? "bg-green-500 text-white cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600")}
            onClick={handleSave}
            disabled={saved || saving}
          >
            {saved ? "Saved" : "Save Recipe"}
          </button>
        </div>
      )}
    </div>
  );
}