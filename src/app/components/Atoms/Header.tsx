"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import styles from "./Header.module.css"

export default function Header() {
  const { data: session } = useSession()
  return (
    <header className={styles.header}>
      <Link href="/">
        <h1 className={styles.logo}>List 2 Dish</h1>
      </Link>
      <div className={styles.nav}>
        {session ? (
          <>
            <span className={styles.userName}>{session.user?.name}</span>
            <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.link}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.link}>
              Login
            </Link>
            <Link href="/register" className={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  )
}