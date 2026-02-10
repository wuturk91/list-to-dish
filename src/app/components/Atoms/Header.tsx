"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()
  return (
    <header className="sticky h-16 flex items-center justify-between top-0 w-full p-4 bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)] border-b border-white z-10">
      <Link href="/">
        <h1 className="w-full font-bold text-2xl">List 2 Dish</h1>
      </Link>
      <div className="flex gap-4">
        {session ? (
          <>
            <span className="text-white">{session.user?.name}</span>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-white hover:underline">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-white hover:underline">
              Login
            </Link>
            <Link href="/register" className="text-white hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  )
}