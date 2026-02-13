'use client'
import styles from "./Button.module.css"

const variantStyles = {
  primary: styles.primary,
  outline: styles.outline,
  cta: styles.cta,
  icon: styles.icon
} as const

export type ButtonVariant = keyof typeof variantStyles

type ButtonProps = {
  variant: ButtonVariant
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  onClickAction?: () => void
  children: React.ReactNode
}

export default function Button({
  variant,
  type = 'button',
  disabled = false,
  loading = false,
  loadingText,
  onClickAction,
  children
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${variantStyles[variant]}`}
      disabled={disabled || loading}
      onClick={onClickAction}
    >
      {loading && loadingText ? loadingText : children}
    </button>
  )
}