export interface Ingredients {
  item: string
  quantity: string
}

export interface Recipe {
  name: string
  description: string
  prepTime: number
  cookingTime: number
  ingredients: Ingredients[]
  instructions: string[]
}