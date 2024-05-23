'use client'

import photoDelete from '@/actions/photo-delete'
import { useState } from 'react'

import styles from './photo-delete.module.css'

type PhotoDeleteProps = {
  id: string
}
export default function PhotoDelete({ id }: PhotoDeleteProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    const confirm = window.confirm('Tem certeza que deseja deletar?')
    if (confirm) {
      await photoDelete(id)
    }
    setLoading(false)
  }
  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button className={styles.delete} onClick={handleClick}>
          Deletar
        </button>
      )}
    </>
  )
}
