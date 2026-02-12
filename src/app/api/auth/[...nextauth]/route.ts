import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import clientPromise from "@lib/mongodb"

export const authOptions: NextAuthOptions = {
  // Configure the Credentials Provider
  providers: [
    CredentialsProvider({
      name: "credentials",
      
      // Define the fields on the login form
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      
      // This function runs when user tries to log in
      async authorize(credentials) {
        // 1. Validate that credentials were provided
        if (!credentials?.email || !credentials?.password) {
          return null  // null = authentication failed
        }

        // 2. Connect to database
        const client = await clientPromise
        const db = client.db(process.env.MONGODB_DB)
        
        // 3. Find user by email
        const user = await db.collection('users').findOne({ 
          email: credentials.email 
        })
        
        // 4. If no user found, fail
        if (!user) {
          return null
        }
        
        // 5. Compare submitted password with stored hash
        const passwordMatch = await bcrypt.compare(
          credentials.password,  // Plain text from form
          user.password          // Hashed version from database
        )
        
        // 6. If password wrong, fail
        if (!passwordMatch) {
          return null
        }
        
        // 7. Success! Return user object
        // This data gets encoded into the JWT
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  
  // Use JWT for sessions (stored in cookie, not database)
  session: {
    strategy: "jwt"
  },
  
  // Custom pages (optional - NextAuth has defaults)
  pages: {
    signIn: "/login"
  },
  
  // Callbacks let you customize the JWT and session
  callbacks: {
    // Called when JWT is created or updated
    async jwt({ token, user }) {
      // On first login, user object exists
      // Add the user id to the token
      if (user) {
        token.id = user.id
      }
      return token
    },
    
    // Called when session is checked
    async session({ session, token }) {
      // Add user id to the session object
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

// Export for both GET and POST requests
export { handler as GET, handler as POST }