'use client'

import { useFormState, useFormStatus } from 'react-dom'
import Button from '../Button'
import styles from './login-form.module.css'
import ErrorMessage from '../ErrorMessage'
import Input from '../Input'
import passwordReset from '@/actions/password-reset'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>
      {pending ? 'Resetando...' : 'Resetar senha'}
    </Button>
  )
}

type ResetarSenhaProps = {
  keyToken: string
  login: string
}

export default function ResetarSenha({ keyToken, login }: ResetarSenhaProps) {
  const [state, action] = useFormState(passwordReset, {
    ok: false,
    error: '',
    data: null,
  })

  return (
    <form action={action} className={styles.form}>
      <Input label="Senha" type="password" name="password" />
      <input type="hidden" name="login" value={login} />
      <input type="hidden" name="key" value={keyToken} />
      <ErrorMessage error={state.error} />

      <FormButton />
    </form>
  )
}
