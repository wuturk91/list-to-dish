'use client';
import TextArea from '../Atoms/TextArea';
import { useState } from 'react';
import ImageUpload from './ImageUpload';

type IngredientInputProps = {
  setDishesAction: (dishes: Dish[]) => void
}

type Ingredients = {
  item: string
  quantity: string
}

interface Dish {
  name: string
  description: string
  prepTime: string
  cookingTime: string
  ingredients: Ingredients[]
  instructions: string[]
}

// Lots of refactoring needed here to separate concerns and make code cleaner
// State persists after a request - should we clear state before new submission

export default function IngredientInput({ setDishesAction }: IngredientInputProps) {
  const [ ingredients, setIngredients ] = useState('')
  const [ uploadedImages, setUploadedImages ] = useState<string[]>([])
  const [ imagePreviews, setImagePreviews ] = useState<string[]>([])
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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

      setDishesAction(data.dishes)
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
    <div className="w-full mt-2 bg-white p-4 rounded-md text-black">
      <h3 className="text-lg font-semibold mb-2">Enter your ingredients</h3>
      <TextArea
        placeholder="Enter your ingredients here..."
        value={ingredients}
        onChangeAction={(value) => setIngredients(value)}
        disabled={loading}
      />
      <ImageUpload images={uploadedImages} setImagesAction={setUploadedImages} loading={loading} />
      <button 
        className={`h-12 w-full items-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#d3d3d3] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        Generate
      </button>
    </div>
  )
}