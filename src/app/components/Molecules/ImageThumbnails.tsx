'use client'
import ImagePreview from "app/components/Atoms/ImagePreview";

type ImageThumbnailsProps = {
  images: string[],
  removeImageAction: (index: number) => void
}

export default function ImageThumbnails({ images, removeImageAction }: ImageThumbnailsProps) {
  return (
    <div className="mb-4 flex gap-4 overflow-x-auto">
      {images.map((imageUrl, index) => (
        <ImagePreview key={index} imageDataUrl={imageUrl} removeImageAction={() => removeImageAction(index)} />
      ))}
    </div>
  )
}