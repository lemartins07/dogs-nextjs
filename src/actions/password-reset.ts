'use server'

import { PASSWORD_RESET } from '@/app/functions/api'
import apiError from '@/app/functions/api-error'
import { redirect } from 'next/navigation'

export default async function passwordReset(state: object, formData: FormData) {
  const login = formData.get('login') as string | null
  const key = formData.get('key') as string | null
  const password = formData.get('password') as string | null

  try {
    if (!login || !key || !password) throw new Error('Preencha os dados.')

    const { url } = PASSWORD_RESET()
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    console.log(response)

    if (!response.ok) throw new Error('Não autorizado.')
  } catch (error: unknown) {
    return apiError(error)
  }

  redirect('/login')
}
