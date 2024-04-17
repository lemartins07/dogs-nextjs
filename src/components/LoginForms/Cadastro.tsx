'use client'

import { useFormState, useFormStatus } from 'react-dom'
import Button from '../Button'
import styles from './login-form.module.css'
import { useEffect } from 'react'
import ErrorMessage from '../ErrorMessage'
import Input from '../Input'
import userPost from '@/actions/user-post'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>
      {pending ? 'Cadastrando...' : 'Cadastrar'}
    </Button>
  )
}

export default function Cadastro() {
  const [state, action] = useFormState(userPost, {
    ok: false,
    error: '',
    data: null,
  })

  useEffect(() => {
    if (state.ok) window.location.href = '/conta'
  }, [state.ok])

  return (
    <form action={action} className={styles.form}>
      <Input label="Usuário" type="text" name="username" />
      <Input label="Email" type="email" name="email" />
      <Input label="Senha" type="password" name="password" />
      <ErrorMessage error={state.error} />
      <FormButton />
    </form>
  )
}
