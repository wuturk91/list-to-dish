"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/generate')
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)]">
      <h1 className="text-2xl font-bold mt-20">Login</h1>
      <form onSubmit={handleSubmit} className="mt-4 bg-white p-6 rounded-md shadow-md w-150">
        
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button 
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link href="/register" className="text-purple-600 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  )
}