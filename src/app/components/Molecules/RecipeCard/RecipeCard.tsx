'use client'
import { useState } from "react"
import { saveRecipe } from "@lib/actions"
import { type Recipe } from "@customTypes/index"
import styles from './RecipeCard.module.css'
import Button from "../../Atoms/Button/Button"

export default function Recipe({ recipe }: { recipe: Recipe }) {
  const [ expanded, setExpanded ] = useState(false)
  const [ saved, setSaved ] = useState(false)
  const [ saving, setSaving ] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    const result = await saveRecipe(recipe)
    setSaving(false)
    if (result && result.success) {
      setSaved(true)
    } else {
      console.error('Error saving recipe', result) // replace with user-facing error message and get error details
    }
  }

  return (
    <div className={styles.card}>
      <button className={styles.cardHeader} onClick={() => setExpanded(!expanded)}>
        <h3 className={styles.cardTitle}>{recipe.name}</h3>
        <p className={styles.cardDescription}>{recipe.description}</p>
      </button>
      
      {expanded && (
        <div className={styles.cardContent}>
          <p className={styles.meta}>Prep Time: {recipe.prepTime} mins | Cooking Time: {recipe.cookingTime} mins</p>
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Ingredients</h4>
            <ul className={`${styles.list} ${styles.ingredientList}`}>
              {recipe.ingredients && recipe.ingredients.map((ingredient, id) => (
                <li key={id}>{ingredient.quantity} of {ingredient.item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Instructions</h4>
            <ol className={`${styles.list} ${styles.instructionList}`}>
              {recipe.instructions && recipe.instructions.map((step, id) => (
                <li key={id} className={styles.instructionItem}>{step}</li>
              ))}
            </ol>
          </div>
          <Button
            variant="primary"
            disabled={saved || saving}
            onClickAction={handleSave}
          >
            {saved ? "Saved" : "Save Recipe"}
          </Button>
        </div>
      )}
    </div>
  );
}