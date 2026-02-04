'use client';

type TextAreaProps = {
  placeholder?: string
  value?: string
  onChangeAction?: (value: string) => void
  disabled?: boolean
}

export default function TextArea({ placeholder, value, onChangeAction, disabled }: TextAreaProps) {
  return (
    <textarea
      name="ingredients"
      className={"border-3 border-gray-300 p-2 rounded-md w-full h-20 resize-none" + (disabled ? " opacity-50 cursor-not-allowed" : "")}
      placeholder={placeholder}
      value={value || ''}
      onChange={(e) => onChangeAction?.(e.target.value)}
      disabled={disabled}
    />
  )
}