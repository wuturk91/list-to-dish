'use client';

import styles from './TextArea.module.css'

type TextAreaProps = {
  placeholder?: string
  value?: string
  onChangeAction?: (value: string) => void
  disabled?: boolean
}

export default function TextArea({
  placeholder,
  value,
  onChangeAction,
  disabled
}: TextAreaProps) {
  return (
    <textarea
      name="ingredients"
      className={`${styles.textarea} ${disabled ? styles.disabled : ''}`}
      placeholder={placeholder}
      value={value ?? ''}
      onChange={(e) => onChangeAction?.(e.target.value)}
      disabled={disabled}
      suppressHydrationWarning
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
    />
  )
}