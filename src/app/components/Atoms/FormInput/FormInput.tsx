'use client'
import styles from './FormInput.module.css'

type FormInputProps = {
  label: string
  name: string
  type?: 'text' | 'email' | 'password' | 'number'
  value?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  onChangeAction: (value: string) => void
}

export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  required = false,
  disabled = false,
  placeholder,
  onChangeAction
}: FormInputProps) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChangeAction(e.target.value)}
        className={styles.input}
      />
    </div>
  )
}
