"use client"
import styles from "./Alert.module.css"

const variantStyles = {
  error: styles.error,
  success: styles.success
} as const

export type AlertVariant = keyof typeof variantStyles

type AlertProps = {
  variant: AlertVariant
  message: string
}

export default function Alert({
  variant,
  message
}: AlertProps) {
  return (
    <div className={styles.alertContainer}>
      <p className={`${variantStyles[variant]}`}>{message}</p>
    </div>
  )
}