'use client'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import IngredientInput from "app/components/Molecules/IngredientInput/IngredientInput"
import RecipeCard from "app/components/Molecules/RecipeCard/RecipeCard"
import { type Recipe } from "types"
import styles from './page.module.css'

export default function Generate() {
  const { status } = useSession()
  const [ recipes, setRecipes ] = useState<Recipe[]>([]);
  
  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>
  }
  
  if (status === "unauthenticated") {
    redirect("/login")
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Recipe Generator</h1>
        <p className={styles.subtitle}>Enter ingredients to generate recipes.</p>
        <IngredientInput setRecipeAction={setRecipes} />
        <div className={styles.recipesSection}>
          {recipes && recipes.length > 0 &&
            <h2 className={styles.recipesTitle}>Your Recipes</h2>
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