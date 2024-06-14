'use client'

import React from 'react'
import styles from './styles.module.css'
import { PhotoContent } from '../PhotoContent'
import { PhotoData } from '@/actions/photo-get'
import { usePathname, useRouter } from 'next/navigation'

type FeedModalProps = {
  photo: PhotoData
}

export default function FeedModal({ photo }: FeedModalProps) {
  const router = useRouter()
  const pathname = usePathname()

  if (!pathname.includes('foto')) {
    return null
  }

  function handleOutsideClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) router.back()
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <PhotoContent data={photo} single={false} />
    </div>
  )
}
