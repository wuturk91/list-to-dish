'use client'

import styles from './ImagePreview.module.css'

type ImagePreviewProps = {
  imageDataUrl: string
  removeImageAction: () => void
}

export default function ImagePreview({ imageDataUrl, removeImageAction }: ImagePreviewProps) {
  return (
    <div className={styles.container}>
      <button
        className={styles.removeButton}
        onClick={removeImageAction}
      >
        &times;
      </button>
      <img
        className={styles.image}
        src={imageDataUrl}
        alt="Preview image"
      />
    </div>
  )
}