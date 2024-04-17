'use client'

import login from '@/actions/login'
import { useFormState, useFormStatus } from 'react-dom'
import Button from '../Button'
import styles from './login-form.module.css'
import { useEffect } from 'react'
import ErrorMessage from '../ErrorMessage'
import Link from 'next/link'
import Input from '../Input'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>{pending ? 'Enviando...' : 'Entrar'}</Button>
  )
}

export default function Login() {
  const [state, action] = useFormState(login, {
    ok: false,
    error: '',
    data: null,
  })

  useEffect(() => {
    if (state.ok) window.location.href = '/conta'
  }, [state.ok])

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Usuário" type="text" name="username" />
        <Input label="Senha" type="password" name="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>

      <Link className={styles.perdeu} href="/login/perdeu">
        Esqueceu a senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className="button" href="/login/criar">
          Cadastro
        </Link>
      </div>
    </>
  )
}
