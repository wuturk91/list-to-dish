'use client'

export default function ImagePreview({ imageDataUrl }: { imageDataUrl: string }) {
  return (
    <img
      className="w-24 h-24 object-cover rounded-md border border-gray-300"
      src={imageDataUrl}
      alt="Preview image"
    />
  )
}