'use client'
import { useRef, useState } from 'react';
import ImageThumbnail from '@components/Molecules/ImageThumbnail/ImageThumbnail';
import ImageUploadButton from '@components/Atoms/ImageUploadButton/ImageUploadButton';
import styles from './ImageUpload.module.css'

type ImageUploadProps = {
  images: string[]
  setImagesAction: (images: string[]) => void
  loading: boolean
}

export default function ImageUpload({ images, setImagesAction, loading }: ImageUploadProps) {
  const [ imagePreviews, setImagePreviews ] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
    
  const triggerUpload = () => {
    if (fileInputRef.current) {
      (fileInputRef.current).click()
    }
  }

  const removeImage = (index: number) => {
    setImagePreviews(prev => {
      const updatedPreviews = [...prev]
      URL.revokeObjectURL(updatedPreviews[index])
      updatedPreviews.splice(index, 1)
      return updatedPreviews
    })
    let updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImagesAction(updatedImages)
  }
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imagePreview = URL.createObjectURL(file)
      setImagePreviews(prev => [...prev, imagePreview])

      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result
        if (typeof imageDataUrl === 'string') {
          setImagesAction([...images, imageDataUrl])
        }
      };
      reader.readAsDataURL(file)
    }
  }
  return (
    <div>
      <h3 className={styles.title}>Upload Images</h3>
      <div className={styles.uploadRow}>
        {imagePreviews.length > 0 &&
          <ImageThumbnail
            images={imagePreviews}
            removeImageAction={removeImage}
          />
        }
        <ImageUploadButton
          triggerUploadAction={triggerUpload}
          fileInputRef={fileInputRef}
          handleFileChangeAction={handleFileChange}
          loading={loading}
        />
      </div>
    </div>
  )
}