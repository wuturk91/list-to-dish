'use client'
import styles from './PageContainer.module.css'

type PageContainerProps = {
  centered?: boolean
  children: React.ReactNode
}

export default function PageContainer({
  centered = false,
  children
}: PageContainerProps) {
  return (
    <div className={`${styles.container} ${centered ? styles.centered : ''}`}>
      {children}
    </div>
  )
}
