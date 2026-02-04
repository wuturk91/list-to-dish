import { NextResponse } from 'next/server'
import { openai } from '../../lib/openai'
import { ChatCompletionContentPart } from 'openai/resources/chat/completions'


export async function POST(request: Request) {
  const systemPrompt = `
    You are a professional chef who creates unique and delicious dishes based on given ingredients.
    The ingredients can be given as text, images, or a combination of both.

    Your task is to output only a JSON array of dishes, using only the ingredients provided. Each dish must follow this exact structure:

    {
      "name": "Dish Name",
      "description": "Brief description of the dish",
      "prepTime": "Prep time in minutes",
      "cookingTime": "Cooking time in minutes",
      "ingredients": [
      {"item": "ingredient name", "quantity": "amount and unit"}
      ],
      "instructions": ["Step 1", "Step 2", ...]
    }

    Requirements:

    Output only a JSON array; do not wrap it in any object (for example, no { "dishes": [...] }).

    Do not include any text before, after, or around the array (no explanations, no markdown, no extra JSON keys).

    Generate 1 to 5 dishes.

    Each dish must use only a subset of the provided ingredients, with explicit quantities.

    Use valid JSON syntax (double quotes, correct commas, no trailing commas).

    Example output (structure only, not content):

    [
      {
        "name": "Dish 1",
        "description": "A tasty dish.",
        "prepTime": "10",
        "cookingTime": "20",
        "ingredients": [
          {"item": "ingredient1", "quantity": "1 cup"},
          {"item": "ingredient2", "quantity": "2 tbsp"}
        ],
        "instructions": ["Step 1.", "Step 2."]
      }
    ]
    
    Now, using only the provided ingredients by the user, generate the dish array: [list ingredients here].
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

    if (!ingredients) {
      return NextResponse.json({ error: 'Please provide at least one ingredient' }, 
      { status: 400 })
    }

    const content = generateContent(`Create a list of creative dish ideas using the following ingredients: ${ingredients}.`, base64Images ? base64Images : undefined)

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

    const response = completion.choices[0].message?.content || 'Sorry, no dishes could be generated.'
    const dishes = JSON.parse(response)

    return NextResponse.json({ dishes })
  } catch (error) {
    console.error('Error generating dishes:', error)
    return NextResponse.json({ error: 'An error occurred while generating dishes' }, 
    { status: 500 })
  }
}