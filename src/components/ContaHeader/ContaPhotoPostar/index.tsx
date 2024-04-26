'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { ChangeEvent, useState } from 'react'
import photoPost from '@/actions/photo-post'
import Input from '@/components/Input'
import ErrorMessage from '@/components/ErrorMessage'
import Button from '@/components/Button'

import styles from './styles.module.css'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>{pending ? 'Enviando...' : 'Enviar'}</Button>
  )
}

export default function ContaPhotoPostar() {
  const [state, action] = useFormState(photoPost, {
    ok: false,
    error: '',
    data: null,
  })

  const [img, setImg] = useState('')

  function handleImgChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      setImg(URL.createObjectURL(target.files[0]))
    }
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form action={action}>
        <Input type="text" label="Nome" name="nome" />
        <Input type="number" label="Peso" name="peso" />
        <Input type="number" label="Idade" name="idade" />

        <input
          type="file"
          name="img"
          id="img"
          className={styles.file}
          onChange={handleImgChange}
        />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>

      <div>
        <div
          className={styles.preview}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
    </section>
  )
}
