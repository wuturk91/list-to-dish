'use client'
import ImagePreview from "app/components/Atoms/ImagePreview";
import styles from './ImageThumbnails.module.css'

type ImageThumbnailsProps = {
  images: string[],
  removeImageAction: (index: number) => void
}

export default function ImageThumbnails({ images, removeImageAction }: ImageThumbnailsProps) {
  return (
    <div className={styles.container}>
      {images.map((imageUrl, index) => (
        <ImagePreview key={index} imageDataUrl={imageUrl} removeImageAction={() => removeImageAction(index)} />
      ))}
    </div>
  )
}