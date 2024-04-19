'use client'

import { useFormState, useFormStatus } from 'react-dom'
import Button from '../Button'
import styles from './login-form.module.css'
import { useEffect, useState } from 'react'
import ErrorMessage from '../ErrorMessage'
import Input from '../Input'
import passwordLost from '@/actions/password-lost'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>
      {pending ? 'Enviando...' : 'Enviar E-mail'}
    </Button>
  )
}

export default function EsqueceuSenha() {
  const [state, action] = useFormState(passwordLost, {
    ok: false,
    error: '',
    data: null,
  })

  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href.replace('esqueceu', 'resetar'))
  }, [])

  return (
    <form action={action} className={styles.form}>
      <Input label="E-mail / Usuário" type="text" name="login" />
      <input type="hidden" name="url" value={url} />
      <ErrorMessage error={state.error} />

      {state.ok ? (
        <p style={{ color: '#4c1' }}>Email enviado.</p>
      ) : (
        <FormButton />
      )}
    </form>
  )
}
