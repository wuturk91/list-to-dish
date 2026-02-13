'use client'
import ImagePreview from "@components/Molecules/ImagePreview/ImagePreview";
import styles from './ImageThumbnail.module.css'

type ImageThumbnailProps = {
  images: string[],
  removeImageAction: (index: number) => void
}

export default function ImageThumbnail({
  images,
  removeImageAction
}: ImageThumbnailProps) {
  return (
    <div className={styles.container}>
      {images.map((imageUrl, index) => (
        <ImagePreview key={index} imageDataUrl={imageUrl} removeImageAction={() => removeImageAction(index)} />
      ))}
    </div>
  )
}