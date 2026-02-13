'use client'

import styles from './ImageUploadButton.module.css'

type ImageUploadButtonProps = {
  triggerUploadAction: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  handleFileChangeAction: (event: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean
}

export default function ImageUploadButton({
  triggerUploadAction,
  fileInputRef,
  handleFileChangeAction,
  loading
}: ImageUploadButtonProps) {
  return (
    <button 
      className={styles.button}
      onClick={triggerUploadAction}        
    >
      +
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChangeAction}
        accept="image/*"
        disabled={loading}
        hidden
      />
    </button>
  )
}