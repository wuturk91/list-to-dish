'use client';
import TextArea from '@components/Atoms/TextArea/TextArea'
import { useState } from 'react'
import ImageUpload from '@components/Molecules/ImageUpload/ImageUpload'
import { Recipe } from '@customTypes/index'
import Button from '../../Atoms/Button/Button';
import styles from './IngredientInput.module.css'

type IngredientInputProps = {
  setRecipeAction: (recipes: Recipe[]) => void
}

// Lots of refactoring needed here to separate concerns and make code cleaner
// State persists after a request - should we clear state before new submission

export default function IngredientInput({
  setRecipeAction
}: IngredientInputProps) {
  const [ ingredients, setIngredients ] = useState('')
  const [ uploadedImages, setUploadedImages ] = useState<string[]>([])
  const [ imagePreviews, setImagePreviews ] = useState<string[]>([])
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients, base64Images: uploadedImages  }),
      })

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong - Failed to generate recipes.')
      }

      setRecipeAction(data.recipes || [])
    } catch (error: any) {
      console.error('Error submitting ingredients:', error);
      setError(error.message || 'An error occurred while generating recipes.')
    } finally {
      if (imagePreviews.length > 0) {
        imagePreviews.forEach(preview => URL.revokeObjectURL(preview))
      }
      setImagePreviews([])
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Enter your ingredients</h3>
      <TextArea
        placeholder="Enter your ingredients here..."
        value={ingredients}
        onChangeAction={(value) => setIngredients(value)}
        disabled={loading}
      />
      <ImageUpload images={uploadedImages} setImagesAction={setUploadedImages} loading={loading} />
      <Button
        variant="primary"
        disabled={loading}
        loading={loading}
        loadingText="Generating..."
        onClickAction={handleSubmit}
      >
        Generate
      </Button>
    </div>
  )
}