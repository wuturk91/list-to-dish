"use server"
import { revalidatePath } from "next/cache"
import clientPromise from "lib/mongodb"
import { Recipe } from "types"

export async function saveRecipe(recipe: Recipe) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    const rawData = {
      name: recipe.name,
      description: recipe.description,
      prepTime: recipe.prepTime,
      cookingTime: recipe.cookingTime,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
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
