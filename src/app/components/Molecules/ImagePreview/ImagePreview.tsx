'use client'

import Button from '../../Atoms/Button/Button'
import styles from './ImagePreview.module.css'

type ImagePreviewProps = {
  imageDataUrl: string
  removeImageAction: () => void
}

export default function ImagePreview({
  imageDataUrl,
  removeImageAction
}: ImagePreviewProps) {
  return (
    <div className={styles.container}>
      <Button
        variant="icon"
        onClickAction={removeImageAction}
      >
        &times;
      </Button>
      <img
        className={styles.image}
        src={imageDataUrl}
        alt="Preview image"
      />
    </div>
  )
}