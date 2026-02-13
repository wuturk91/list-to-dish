"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import styles from "./Header.module.css"
import Button from "../Button/Button"
import { ButtonVariant } from "../Button/Button"

export default function Header() {
  const { data: session } = useSession()
  return (
    <header className={styles.header}>
      <Link href="/">
        <h1 className={styles.headerHeading}>List 2 Dish</h1>
      </Link>
      <div className={styles.nav}>
        {session ? (
          <>
            {/* <span className={styles.userName}>{session.user?.name}</span> */}
            <Button
              variant="outline"
              onClickAction={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline">
              <Link href="/login">
                Login
              </Link>
            </Button>
            <Button variant="outline">
              <Link href="/register">
                Register
              </Link>
            </Button>
          </>
        )}
      </div>
    </header>
  )
}