'use client'

import commentPost from '@/actions/comment-post'
import { Comment } from '@/actions/photo-get'
import React, { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import EnviarIcon from '@/icons/enviar-icon'

import styles from './photo-comments-form.module.css'
import ErrorMessage from '../ErrorMessage'

type PhotoCommentsFormsProps = {
  single: boolean
  id: number
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

function FormButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      <EnviarIcon />
    </button>
  )
}

export default function PhotoCommentsForms({
  single,
  id,
  setComments,
}: PhotoCommentsFormsProps) {
  const [state, action] = useFormState(commentPost, {
    ok: false,
    data: null,
    error: '',
  })

  useEffect(() => {
    if (state.ok && state.data) {
      setComments((comments) => [...comments, state.data])
      setComment('')
    }
  }, [state, setComments])

  const [comment, setComment] = useState('')

  return (
    <form
      action={action}
      className={`${styles.form} ${single ? styles.single : ''}`}
    >
      <input type="hidden" name="id" id="id" value={id} />
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></textarea>
      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  )
}
