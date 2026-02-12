import { NextResponse } from 'next/server'
import { openai } from '../../../lib/openai'
import { ChatCompletionContentPart } from 'openai/resources/chat/completions'


export async function POST(request: Request) {
  const systemPrompt = `
    You are a professional chef who creates unique and delicious recipes based on given ingredients.
    The ingredients can be given as text, images, or a combination of both.

    Your task is to output only a JSON array of recipes, using only the ingredients provided. Each recipe must follow this exact structure:

    {
      "name": "recipe Name",
      "description": "Brief description of the recipe",
      "prepTime": "Prep time in minutes",
      "cookingTime": "Cooking time in minutes",
      "ingredients": [
      {"item": "ingredient name", "quantity": "amount and unit"}
      ],
      "instructions": ["Step 1", "Step 2", ...]
    }

    Requirements:

    Output only a JSON array; do not wrap it in any object (for example, no { "recipes": [...] }).

    Do not include any text before, after, or around the array (no explanations, no markdown, no extra JSON keys).

    Generate 1 to 5 recipes.

    Each recipe must use only a subset of the provided ingredients, with explicit quantities.

    Use valid JSON syntax (double quotes, correct commas, no trailing commas).

    Example output (structure only, not content):

    [
      {
        "name": "recipe 1",
        "description": "A tasty recipe.",
        "prepTime": "10",
        "cookingTime": "20",
        "ingredients": [
          {"item": "ingredient1", "quantity": "1 cup"},
          {"item": "ingredient2", "quantity": "2 tbsp"}
        ],
        "instructions": ["Step 1.", "Step 2."]
      }
    ]
    
    Now, using only the provided ingredients by the user, generate the recipe array: [list ingredients here].
  `
  const generateContent = (requestText: string, base64Images?: string[]): ChatCompletionContentPart[] => {
    const content: ChatCompletionContentPart[] = [
      { type: 'text', text: requestText }
    ]

    if (base64Images && base64Images.length > 0) {
      base64Images.forEach(url => {
        content.push({
          type: 'image_url',
          image_url: { url: url }
        } as ChatCompletionContentPart)
      })
    }

    return content
  }

  try {
    const { ingredients, base64Images } = await request.json()

    if (!ingredients && (!base64Images || base64Images.length === 0)) {
      return NextResponse.json({ error: 'Please provide at least one ingredient' }, 
      { status: 400 })
    }

    const content = generateContent(`Create a list of creative recipe ideas using the following ingredients: ${ingredients}.`, base64Images ? base64Images : undefined)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: content
        },
      ],
      temperature: 0.7,
    })

    const response = completion.choices[0].message?.content || 'Sorry, no recipes could be generated.'
    const recipes = JSON.parse(response)

    return NextResponse.json({ recipes })
  } catch (error) {
    console.error('Error generating recipes:', error)
    return NextResponse.json({ error: 'An error occurred while generating recipes' }, 
    { status: 500 })
  }
}