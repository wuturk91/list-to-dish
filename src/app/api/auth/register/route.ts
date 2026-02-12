import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import clientPromise from "lib/mongodb"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Please provide name, email, and password' }, 
      { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exist' }, 
      { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)
    // Create new user
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    })

    return NextResponse.json(
      { message: 'User registered successfully', userId: result.insertedId }, 
      { status: 201 }
    )
  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json({ error: 'An error occurred while registering user' }, 
    { status: 500 })
  }
}