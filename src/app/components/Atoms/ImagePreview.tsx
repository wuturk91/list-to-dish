'use client'

type ImagePreviewProps = {
  imageDataUrl: string
  removeImageAction: () => void
}

export default function ImagePreview({ imageDataUrl, removeImageAction }: ImagePreviewProps) {
  return (
    <div className="relative">
      <button
        className="absolute top-1 right-1 bg-gray-800 text-white font-bold rounded-full w-4 h-4 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity"
        onClick={removeImageAction}
      >
        &times;
      </button>
      <img
        className="w-24 h-24 object-cover rounded-md border border-gray-300"
        src={imageDataUrl}
        alt="Preview image"
      />
    </div>
  )
}