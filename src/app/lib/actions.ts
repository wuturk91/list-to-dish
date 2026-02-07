"use server"
import { revalidatePath } from "next/cache"
import clientPromise from "app/lib/mongodb"
import { Dish } from "app/components/Molecules/Recipe"

// create an interface for the expected form data - clean up types and interfaces across the app
export async function saveRecipe(dish: Dish) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    const rawData = {
      name: dish.name,
      description: dish.description,
      prepTime: dish.prepTime,
      cookingTime: dish.cookingTime,
      ingredients: dish.ingredients,
      instructions: dish.instructions,
      savedAt: new Date()
    }

    await db.collection('recipes').insertOne(rawData)
    revalidatePath('/generate') // should path be passed in?
    return { success: true }
  } catch (error) {
    console.error('Error saving recipe:', error)
    return { success: false, error: 'Failed to save recipe' }
  }
}
