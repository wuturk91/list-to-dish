'use client'
import ImagePreview from "app/components/Atoms/ImagePreview";

type ImageThumbnailsProps = {
  images: string[]
}

export default function ImageThumbnails({ images }: ImageThumbnailsProps) {
  return (
    <div className="mb-4 flex gap-4 overflow-x-auto">
      {images.map((imageUrl, index) => (
        <ImagePreview key={index} imageDataUrl={imageUrl} />
      ))}
    </div>
  )
}