'use client'

type ImageUploadButtonProps = {
  triggerUploadAction: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  handleFileChangeAction: (event: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean
}

export default function ImageUploadButton({ triggerUploadAction, fileInputRef, handleFileChangeAction, loading }: ImageUploadButtonProps) {
  return (
    <button 
      className="h-24 w-24 rounded-md mb-2 items-center bg-foreground px-5 text-background transition-colors hover:bg-[#d3d3d3] border border-dashed border-gray-400"
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